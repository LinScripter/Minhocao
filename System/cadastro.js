function cadastrar() {
    var nome = document.getElementById('nome').value;
    var email = document.getElementById('cadastro-email').value;
    var senha = document.getElementById('cadastro-senha').value;
    var confirmarSenha = document.getElementById('confirmar-senha').value;

    if (senha === confirmarSenha) {
        var newUser = { nome: nome, email: email, senha: senha };

        var storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        storedUsers.push(newUser);

        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert("Cadastro realizado com sucesso");
    } else {
        erroMsg.textContent = "As senhas não coincidem";
        setTimeout(function () {
            erroMsg.textContent = "";
        }, 5000);
    }
}
