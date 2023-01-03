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

var startPoint = [getOffset(puppy).left + puppy.naturalWidth / 2, getOffset(puppy).top + puppy.naturalHeight / 2]

var endPoint  = [getOffset(mother).left + mother.naturalWidth / 2, getOffset(mother).top + mother.naturalHeight / 2]

var pathWidth = endPoint[0] - startPoint[0];
var pathHeight = endPoint[1] - endPoint[1];
console.log(endPoint);
randomPoints.push(startPoint)
for (var i = 0; i < 5; i ++) {
    var xLow = pathWidth / 5 * i;
    var xHigh = pathWidth / 5 * (i + 1);
    var randomX = generateRandomInteger(xLow, xHigh) + startPoint[0];
    var yLow = 0;
    var yHigh = document.body.offsetHeight;
    var randomY = generateRandomInteger(yLow, yHigh);
    var points = [randomX, randomY];
    randomPoints.push(points)
}
randomPoints.push(endPoint)
}

function drawLine(ctx, begin, end, stroke = 'red', width = 1) {
    if (stroke) {
        ctx.strokeStyle = stroke;
    }

    if (width) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
    console.log(ctx.line)
}


generateRandomPoints();
console.log(randomPoints)

for (var i = 0; i < 6; i++) {
    drawLine(ctx, randomPoints[i], randomPoints[i+1], 'red', 10);
}

function randomizeAnimals() {
            puppy.style.top = Math.round(Math.random() * Math.abs(document.body.offsetHeight - puppy.naturalHeight)) + 'px';
            puppy.style.left = Math.round(Math.random() * Math.abs(document.body.offsetWidth / 4 - puppy.naturalWidth)) + 'px';
            container.appendChild(puppy);
            dragElement(puppy);

            mother.style.top = Math.round(Math.random() * Math.abs(document.body.offsetHeight - mother.naturalHeight)) + 'px';
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

    console.log(ctx.isPointInStroke(xz, yz))

//        ctx.fillRect(getOffset(puppy).left, getOffset(puppy).top, 10, 10);
//      	var imgData = ctx.getImageData(e.pageX, e.pageY, 1, 1);
//      	console.log(imgData)
//      	red = imgData.data[0];
//      	green = imgData.data[1];
//      	blue = imgData.data[2];
//      	alpha = imgData.data[3];
//      	console.log(red + " " + green + " " + blue + " " + alpha);

  }

   function checkIfBlank(x, y) {
      	var imgData = ctx.getImageData(x, y, 1, 1);
      	red = imgData.data[0];
      	green = imgData.data[1];
      	blue = imgData.data[2];
      	if (red == 0 && green == 0 || blue == 0) {
      	    return true
      	} else {
      	    return false
      	}
   }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    validate();
  }

  function validate() {
//    var imageX = getOffset(puppy).left + puppy.offsetWidth / 2
//    var imageY = getOffset(puppy).top + puppy.offsetHeight / 2
//    var imagePoint = [imageX, imageY]
//    var data = ctx.getImageData(imageX, imageY, 1, 1).data;
//    var rgb = [ data[0], data[1], data[2] ];
//    console.log(rgb);
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