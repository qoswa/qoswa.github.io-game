let btn = document.createElement("button");
btn.textContent = "STOP GAME";
document.body.appendChild(btn);
btn.style.position = "fixed";
btn.style.background = "RED";
btn.style.right = "30px";
btn.style.bottom = "30px";
btn.onclick = function () {
    localStorage.currentPoints = 0;
    alert('Игра прервана')
    window.location = 'index.html'
};