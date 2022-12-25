let span = document.createElement('span');
let text = document.createTextNode("");
span.appendChild(text);
document.body.appendChild(span);
span.style.position = "fixed";
span.style.background = "WHITE";
span.style.padding = "5px";
span.style.left = "30px";
span.style.bottom = "30px";

var countDownDate = new Date(new Date().getTime() + 1000 * 60 * 2);

var interval = setInterval(function() {

  var now = new Date().getTime();

  var distance = countDownDate - now;

  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  text.textContent = "У вас осталось: " + minutes + " минута " + seconds + " секунд ";

  if (distance < 0) {
    clearInterval(interval);
    localStorage.currentPoints = 0;
    alert('Вы не успели пройти уровень')
    window.location = 'index.html'
  }
}, 1000);