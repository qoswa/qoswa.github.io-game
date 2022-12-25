var unAuthButton = document.getElementById("unAuthButton");
var helloText = document.getElementById("helloText");

var login = localStorage.getItem('login');
if (login == null) {
    let resp = window.prompt("Enter your login");
    if(resp != null) {
        localStorage.setItem('login', resp);
    } else {
        localStorage.setItem('login', 'player1')
    }
}

validateHelloText()

unAuthButton.addEventListener("click", function() {
    localStorage.removeItem('login')
    validateHelloText()
    let prompt = window.prompt("Enter your login");
    if (prompt != null) {
       localStorage.setItem('login', prompt)
    } else {
        localStorage.setItem('login', 'player1')
    }
    validateHelloText()
});

function validateHelloText() {
    var login = localStorage.getItem('login');
    helloText.textContent = 'Hello, ' + login;

}