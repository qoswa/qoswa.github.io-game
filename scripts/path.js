const tbl = document.createElement("table");
const tblBody = document.createElement("tbody");
const container = document.getElementById("container");

var hardMap = [
[1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
[1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0],
[1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
[0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
[0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0],
[1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1],
[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
[0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1],
[0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0],
[1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
[0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
[0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
[0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1],
];

var normalMap = [
  [0,0,0,0,0,1,0,0,1,0],
  [0,1,1,1,1,1,0,1,1,0],
  [0,1,0,0,0,0,0,0,1,0],
  [0,1,1,0,1,1,1,0,0,0],
  [0,1,1,0,1,0,1,1,1,1],
  [0,1,1,0,1,0,0,0,0,1],
  [0,1,1,0,1,1,1,1,0,1],
  [0,0,0,0,0,0,0,1,0,1],
  [1,1,1,1,0,1,0,1,0,1],
  [0,0,0,0,0,1,0,0,0,1]
];

var map = localStorage.difficulty == "normal" ? normalMap : hardMap;
let player = [map.length - 1, 0]
let dog = [0,map.length - 1]

function generateTable() {
  for (let x = 0; x < map[0].length; x++) {
    const row = document.createElement("tr");
    for (let y = 0; y < map.length; y++) {
      const cell = document.createElement("td");
      if (map[x][y] == 0) {
            cell.bgColor = '#00FF00';
      } else {
            cell.bgColor = '#0000FF';
      }
      row.appendChild(cell);
    }
    tblBody.appendChild(row);
  }
  tbl.appendChild(tblBody);
  container.appendChild(tbl);
}

generateTable();
var puppy = document.createElement('img');
puppy.src = "images/puppy.png";
var mother = document.createElement('img');
mother.src = "images/mother.png";
tbl.rows[player[0]].cells[player[1]].appendChild(puppy);
tbl.rows[dog[0]].cells[dog[1]].appendChild(mother);

document.addEventListener('keydown', function(event) {
    const key = event.key;
    switch (event.key) {
        case "ArrowLeft":
        var nextStep = [player[0],player[1] - 1];
        if (isNestStepIsWall(nextStep[0], nextStep[1])) {
            break;
        }
        if (isNestStepIsMother(nextStep[0], nextStep[1])) {
            finish()
            break;
        }
        tbl.rows[player[0]].cells[player[1]].replaceChildren();
        player = nextStep;
        tbl.rows[player[0]].cells[player[1]].appendChild(puppy);
            break;
        case "ArrowRight":
        var nextStep = [player[0],player[1] + 1];
        if (isNestStepIsWall(nextStep[0], nextStep[1])) {
            break;
        }
        if (isNestStepIsMother(nextStep[0], nextStep[1])) {
            finish()
            break;
        }
        tbl.rows[player[0]].cells[player[1]].replaceChildren();
        player = nextStep;
        tbl.rows[player[0]].cells[player[1]].appendChild(puppy);
            break;
        case "ArrowUp":
        var nextStep = [player[0] - 1,player[1]];
        if (isNestStepIsWall(nextStep[0], nextStep[1])) {
            break;
        }
        if (isNestStepIsMother(nextStep[0], nextStep[1])) {
            finish()
            break;
        }
        tbl.rows[player[0]].cells[player[1]].replaceChildren();
        player = nextStep;
        tbl.rows[player[0]].cells[player[1]].appendChild(puppy);
            break;
        case "ArrowDown":
        var nextStep = [player[0] + 1,player[1]];
        if (isNestStepIsWall(nextStep[0], nextStep[1])) {
            break;
        }
        if (isNestStepIsMother(nextStep[0], nextStep[1])) {
            finish();
            break;
        }
        tbl.rows[player[0]].cells[player[1]].replaceChildren();
        player = nextStep;
        tbl.rows[player[0]].cells[player[1]].appendChild(puppy);
            break;
    }
});


function finish() {
    var pointsMultiplier = localStorage.difficulty == "normal" ? 1 : 2
    var points = 5 * pointsMultiplier;
    localStorage.currentPoints = parseFloat(localStorage.currentPoints) + points;
    alert('Вы набрали ' + points + ' очков')
    window.location = 'animal-heap.html'
}

function isNestStepIsWall(row, column) {
    if (row > map.length - 1 || column > map.length - 1 || row < 0 || column < 0) {
        return true
    }
    if (map[row][column] == 1) {
    return true
    } else {
    return false
    }
}
function isNestStepIsMother(row, column) {
    if (row > map.length - 1 || column > map.length - 1 || row < 0 || column < 0) {
        return false
    }
    if (dog[0] == row && dog[1] == column) {
        return true
    } else {
        return false
    }
}


