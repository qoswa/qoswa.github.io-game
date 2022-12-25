var table = document.getElementById("my-table");
var tBody = table.getElementsByTagName('tbody')[0];

validatePoints();
//var results  = Array.from(JSON.parse(localStorage.results).playersWithPoints);
//var set = new Set(results);
//console.log(localStorage.results);
var resultsJson = JSON.parse(localStorage.results);
Object.entries(resultsJson).forEach( ([name, points]) => {
    var row = tBody.insertRow();
    var nameCell = row.insertCell(0);
    var pointsCell = row.insertCell(1);
    nameCell.textContent = name;
    pointsCell.textContent = points;
});

function validatePoints() {
    if (localStorage.results == null) {
        var obj = new Object();
        var jsonString = JSON.stringify(obj);
        localStorage.results = jsonString;
    }

    var json = JSON.parse(localStorage.results);
    json[localStorage.login] = parseFloat(localStorage.currentPoints)
    var jsonString = JSON.stringify(json);
    localStorage.results = jsonString;
}