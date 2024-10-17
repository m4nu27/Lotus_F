// Obtém a referência ao botão de submissão através do seu ID "handleSubmit"
let button = document.getElementById("handleSubmit");

// Define uma função assíncrona que será executada quando o botão for clicado
button.onclick = async function(e) {

    // Previne o comportamento padrão do botão de recarregar a página ao ser clicado
    e.preventDefault(); 

    // Coleta os valores dos campos de input do formulário
    // Cada campo é identificado pela classe correspondente dentro do contêiner com classe 'registro'
    let nome = document.querySelector('.registro .nome').value; // Nome do usuário
    let data_nascimento = document.querySelector('.registro .data').value; // Data de nascimento
    let email = document.querySelector('.registro .email').value; // Email do usuário
    let senha = document.querySelector('.registro .senha').value; // Senha do usuário
    let tipo_usuario = document.querySelector('.registro .tipo_usuario').value; // Tipo de usuário (ex: Instituição, Indivíduo)

    // Cria um objeto com os dados coletados para serem enviados na requisição
    let data = { nome, data_nascimento, email, senha, tipo_usuario }; 

    // Exibe os dados no console para fins de depuração, mostrando o que será enviado ao servidor
    console.log("Dados que serão enviados:", data); 

    try {
        // Envia uma requisição POST para o servidor com os dados do usuário
        const response = await fetch('http://localhost:3020/api/store/user', {
            method: "POST", // Especifica que a requisição é do tipo POST
            headers: { "Content-Type": "application/json;charset=UTF-8" }, // Define o cabeçalho indicando que os dados estão em JSON
            body: JSON.stringify(data) // Converte o objeto `data` para uma string JSON antes de enviar
        });

        // Verifica se a resposta do servidor não é bem-sucedida (código de status fora da faixa 200-299)
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`); // Lança um erro com a mensagem correspondente
        }

        // Converte a resposta do servidor em JSON e armazena no `content`
        let content = await response.json(); 

        // Verifica se a resposta indica sucesso (usando a propriedade `success` do objeto retornado)
        if (content.success) {
            alert("Sucesso"); // Exibe um alerta indicando que o cadastro foi bem-sucedido

            // Redireciona o usuário para a página de login após o sucesso no cadastro
            window.location.href = "/front/html/login.html"

        } else {
            // Exibe um alerta caso o cadastro falhe, sugerindo que o usuário verifique os dados ou se já possui uma conta
            alert("Erro ao cadastrar. Verifique os dados inseridos ou se você já possui uma conta."); 
        }

    } catch (error) {
        // Captura e trata qualquer erro que ocorra durante o envio da requisição
        console.error("Erro ao enviar a requisição:", error); // Loga o erro no console para depuração
        alert("Erro ao enviar a requisição."); // Exibe um alerta ao usuário informando sobre o erro na requisição
    }
};
