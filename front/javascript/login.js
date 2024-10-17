// Define uma função assíncrona chamada 'login' que será executada quando o formulário de login for enviado
async function login(event) {
    // Previne o comportamento padrão de envio do formulário, que recarregaria a página
    event.preventDefault();

    // Obtém o valor do campo de email através do seu ID 'email'
    const email = document.getElementById('email').value;

    // Obtém o valor do campo de senha através do seu ID 'password'
    const senha = document.getElementById('password').value;

    // Cria um objeto 'data' que contém o email e a senha fornecidos pelo usuário
    const data = { email, senha };
    
    // Loga o objeto 'data' no console para fins de depuração, mostrando os dados que serão enviados ao servidor
    console.log(data);

    // Envia uma requisição POST para o servidor, passando as credenciais de login do usuário
    const response = await fetch('http://localhost:3009/api/post/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=UTF-8" // Define o cabeçalho indicando que os dados estão em formato JSON
        },
        body: JSON.stringify(data) // Converte o objeto 'data' para uma string JSON antes de enviá-lo na requisição
    });

    // Aguarda a resposta do servidor e a converte para um objeto JavaScript
    const results = await response.json();
    
    // Loga os resultados no console para depuração, mostrando a resposta recebida do servidor
    console.log(results);

    // Verifica se a resposta do servidor indica sucesso no login (propriedade 'success' igual a true)
    if (results.success) {
        // Se o login foi bem-sucedido, redireciona o usuário para a página principal ('home.html')
        window.location.href = '/front/html/home.html';
    } else {
        // Se o login falhou, exibe uma mensagem de alerta com a mensagem de erro retornada pelo servidor
        alert(results.message);
    }
};