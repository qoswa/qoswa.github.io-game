const container = document.getElementById("container");
const tbl = document.createElement("table");
const tblBody = document.createElement("tbody");

var hardAnimals = new Map([
	["Копытные", ["images/horse", "images/girafe"]],
	["Кошачьи", ["images/cat", "images/tiger"]],
	["Собачьи", ["images/dog", "images/wolf"]],
	["Летячие", ["images/colibri", "images/parrot"]],
]);

var normalAnimals = new Map([
	["Копытные", ["images/horse"]],
	["Кошачьи", ["images/tiger"]],
	["Собачьи", ["images/wolf"]],
	["Летячие", ["images/colibri"]],
]);

var animals = localStorage.difficulty == "normal" ? normalAnimals : hardAnimals

var animalsElements = new Map([]);

var counter = 0;
function generateTable() {
  for (let x = 0; x < 2; x++) {
    const row = document.createElement("tr");
    for (let y = 0; y < 2; y++) {
      const cell = document.createElement("td");
      var randomColor = Math.floor(Math.random()*16777215).toString(16);
      cell.bgColor = randomColor;
      row.appendChild(cell);
      let species = Array.from(animals.keys())[counter++];
      var textElement = document.createTextNode(species);
      cell.appendChild(textElement);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  container.appendChild(tbl);
  counter = 0;
}


function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}

function randomizeAnimals() {
    animals.forEach((value, key) => {
        value.forEach((animal) => {
            var element = document.createElement('img');
            element.src = animal + '.png';
            if (animalsElements.get(key) == null) {
                animalsElements.set(key, [element])
            } else {
                animalsElements.get(key).push(element);
            }
            element.style.top = Math.round(Math.random() * Math.abs(document.body.offsetHeight - element.naturalHeight)) + 'px';
            element.style.left = Math.round(Math.random() * Math.abs(document.body.offsetWidth - element.naturalWidth)) + 'px';
            container.appendChild(element);
            dragElement(element);
        });
    });
    console.log(animalsElements);
}

generateTable();
randomizeAnimals();
getTableDataElementByName("Копытные");

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // otherwise, move the DIV from anywhere inside the DIV:
   elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    validate()
    document.onmouseup = null;
    document.onmousemove = null;
  }

  function validate() {
    var result = true
    animalsElements.forEach((value, key) => {
        value.forEach((animalElement) => {
            var td = getTableDataElementByName(key);
            var isMatched = isInBounds(td, animalElement)
            if (!isMatched) {
                result = false
            }
        });
    });
    if (result) {
        var pointsMultiplier = localStorage.difficulty == "normal" ? 1 : 2
        var points = 4 * pointsMultiplier;
        localStorage.currentPoints = parseFloat(localStorage.currentPoints) + points;
        alert('Вы набрали ' + points + ' очков')
        window.location = 'results.html'
    }
  }
}

function isInBounds(parent, child) {
  var box1coords = parent.getBoundingClientRect();
  var box2coords = child.getBoundingClientRect();
  if (
    box2coords.top < box1coords.top ||
    box2coords.right > box1coords.right ||
    box2coords.bottom > box1coords.bottom ||
    box2coords.left < box1coords.left) {
    return false;
  }
  return true;
}

function getTableDataElementByName(animalSpecies) {
    var result = null
    Array.from(tbl.rows).forEach((tr, row_ind) => {
        var temp =  Array.from(tr.cells).find((element) => {
            if (element.firstChild.nodeValue == animalSpecies) {
                return true
            } else {
                return false
            }
        });
        if (temp != null) {
            result = temp;
        }
    });
    return result;
}