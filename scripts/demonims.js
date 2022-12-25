var demonimsNormalMap = new Map([
	["Москва", "Москвич"],
	["Санкт-Петербург", "Петербуржец"],
	["Уфа", "Уфимец"]
]);

var demonimsHardMap = new Map([
	["Киев", "Киевлянин"],
	["Минск", "Минчанин"],
	["Самара", "Самарец"]
]);

var demonimsMap = localStorage.difficulty == "normal" ? demonimsNormalMap : demonimsHardMap

var login = localStorage.getItem('login');
let demonimsContainer = document.getElementById('demonims-container');
demonimsMap.forEach(logMapElements);
var button = document.createElement('input');
button.type = 'button';
button.id = 'submit';
button.value = 'Проверить';
button.onclick = function() {
    var points = 0;
    Array.from(demonimsContainer.children)
    .filter((child) => {
        if (child instanceof HTMLInputElement && child.type == "text") {
            return true
        } else {
            return false
        }
    })
    .forEach((child) => {
        if (demonimsMap.get(child.getAttribute("placeHolder")) == child.value) {
            points++;
        }
    })
    if (points == 0) {
        finish();
        return;
    }
    var pointsMultiplier = localStorage.difficulty == "normal" ? 1 : 2
    var points = points * pointsMultiplier;
    localStorage.currentPoints = parseFloat(localStorage.currentPoints) + points;
    alert('Вы набрали ' + points + ' очков из ' + demonimsMap.size * pointsMultiplier )
    window.location = 'path.html'
};

demonimsContainer.appendChild(button);

function finish() {
    localStorage.currentPoints = 0;
    alert('Вы не прошли уровень')
    window.location = 'index.html'
}

function logMapElements(value, key, map) {
    let input = document.createElement("input");
    input.setAttribute("type","text");
    input.setAttribute("placeHolder", key);
    demonimsContainer.appendChild(input);
}
