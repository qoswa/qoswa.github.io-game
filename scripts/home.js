var currentLevelText = document.getElementById("currentLevelText");
var normalButton = document.getElementById("selectNormal");
var hardButton = document.getElementById("selectHard");

//reset points
localStorage.currentPoints = 0;

var difficulty = localStorage.difficulty
if (difficulty == null) {
    localStorage.difficulty = 'normal'
}

validateText();

normalButton.addEventListener("click", function() {
    localStorage.difficulty = 'normal'
    validateText();
});

hardButton.addEventListener("click", function() {
    localStorage.difficulty = 'hard';
    validateText();
});

function validateText() {
    currentLevelText.textContent = "Текущий уровень: " + localStorage.difficulty
};