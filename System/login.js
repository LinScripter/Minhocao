function logar() {
    var email = document.getElementById('email').value;
    var senha = document.getElementById('senha').value;
    var erroMsg = document.getElementById('erro-msg');

    var storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    var user = storedUsers.find(u => u.email === email && u.senha === senha);

    if (user) {
        window.location.href = "minhocao.html";
    } else {
        erroMsg.textContent = "Usuário ou senha inválidos";
        setTimeout(function () {
            erroMsg.textContent = "";
        }, 5000);
    }
}
