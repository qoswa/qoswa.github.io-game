const container = document.getElementById("container");
const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var puppy = document.createElement('img');
puppy.src = "images/puppy.png";
var mother = document.createElement('img');
mother.src = "images/mother.png";


randomizeAnimals()

var ctx = canvas.getContext("2d");
var randomPoints = [];

function generateRandomInteger(min, max) {
  return Math.floor(min + Math.random()*(max - min + 1))
}

function generateRandomPoints() {
var numberOfPoints = 5;
var points = [];

var startPoint = [(getOffset(puppy).left + puppy.naturalWidth / 2) - 25 , (getOffset(puppy).top + puppy.naturalHeight / 2) + 20]

var endPoint  = [getOffset(mother).left + mother.naturalWidth / 2, getOffset(mother).top + mother.naturalHeight / 2]

var pathWidth = endPoint[0] - startPoint[0];
var pathHeight = endPoint[1] - endPoint[1];
console.log(endPoint);
randomPoints.push(startPoint)

for (var i = 0; i < 5; i ++) {
    var xLow = pathWidth / 5 * i;
    var xHigh = pathWidth / 5 * (i + 1);
    if (i == 0) {
        var secondPoint = [randomPoints[0][0] + 75, randomPoints[0][1]]
        randomPoints.push(secondPoint)
    } else {
        var randomX = generateRandomInteger(xLow, xHigh) + startPoint[0];
        var yLow = 200;
        var yHigh = document.body.offsetHeight - 200;
        var randomY = generateRandomInteger(yLow, yHigh);
        var points = [randomX, randomY];
        randomPoints.push(points)
    }
}
randomPoints.push(endPoint)
}

function drawLine(ctx, stroke = 'red', width = 50) {

    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }
    ctx.lineJoin = "round";

    ctx.beginPath();

//    var nb = [begin[0], begin[1]]
    ctx.moveTo(...randomPoints[0]);

    for (var i = 0; i < 6; i++) {
        ctx.lineTo(...randomPoints[i+1]);
    }
    ctx.stroke();
}


generateRandomPoints();
console.log(randomPoints)

drawLine(ctx, 'red', 50 );

function randomizeAnimals() {
            puppy.style.top = generateRandomInteger(200, document.body.offsetHeight - puppy.naturalHeight - 400) + 'px';
            puppy.style.left = Math.round(Math.random() * Math.abs(document.body.offsetWidth / 4 - puppy.naturalWidth)) + 'px';
            container.appendChild(puppy);
            dragElement(puppy);

            mother.style.top = generateRandomInteger(200, document.body.offsetHeight - mother.naturalHeight) + 'px';
            mother.style.left = Math.round(Math.random()  * Math.abs(document.body.offsetWidth / 2 - mother.naturalWidth * 2) + document.body.offsetWidth / 2) + 'px';
            container.appendChild(mother);
}

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

    var xz = getOffset(puppy).left
    var yz = getOffset(puppy).top


    if (checkIfBlank(e.pageX, e.pageY)) {
        badFinish()
    }

    if(elementsOverlap(mother, puppy)) {
        finish()
    }

  }

   function checkIfBlank(x, y) {
      	var imgData = ctx.getImageData(x, y, 1, 1);
      	red = imgData.data[0];
      	green = imgData.data[1];
      	blue = imgData.data[2];
      	if (red == 0 && green == 0 && blue == 0) {
      	    return true
      	} else {
      	    return false
      	}
   }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }

}

function elementsOverlap(el1, el2) {
  const domRect1 = el1.getBoundingClientRect();
  const domRect2 = el2.getBoundingClientRect();

  return !(
    domRect1.top > domRect2.bottom ||
    domRect1.right < domRect2.left ||
    domRect1.bottom < domRect2.top ||
    domRect1.left > domRect2.right
  );
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
}


function finish() {
    var pointsMultiplier = localStorage.difficulty == "normal" ? 1 : 2
    var points = 5 * pointsMultiplier;
    localStorage.currentPoints = parseFloat(localStorage.currentPoints) + points;
    alert('Вы набрали ' + points + ' очков')
    window.location = 'animal-heap.html'
}

function badFinish() {
    localStorage.currentPoints = 0;
    alert('Вы не прошли уровень, курсор сошел с пути')
    window.location = 'index.html'
}