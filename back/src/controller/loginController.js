// Importa a configuração de conexão com o banco de dados a partir do arquivo db.js
const connection = require('../config/db.js');

// Importa o pacote dotenv para carregar variáveis de ambiente a partir do arquivo .env
const dotenv = require('dotenv').config();

// Importa a função `response` do express (embora não seja necessário neste contexto, pois `res` já é fornecido pela função de rota)
const { response } = require('express');

// Função assíncrona para realizar o login de um usuário
async function login(req, res) {

    // Extrai o email e a senha do corpo da requisição e os coloca em um array para serem utilizados na query SQL
    const params = Array(
        req.body.email,  // Email fornecido pelo usuário
        req.body.senha   // Senha fornecida pelo usuário
    );
    
    console.log("email p/ cadastro:", req.body.email); 

    // Query SQL para selecionar o email e a senha do usuário que corresponde ao email fornecido
    const query = "SELECT email, senha FROM usuario WHERE email = ?";

    // Executa a query SQL com o parâmetro fornecido (email)
    connection.query(query, params, (err, results) => {
        console.log(err, results); // Loga qualquer erro que possa ocorrer e os resultados da query

        // Verifica se algum resultado foi retornado (ou seja, se o email existe no banco de dados)
        if(results.length > 0) {
            let senhaForms = req.body.senha; // Senha fornecida pelo usuário no formulário
            let senhaDb = results[0].senha;  // o 0 acessa o primeiro usuário que tiver o resultado necessário

            // Compara a senha fornecida pelo usuário com a senha armazenada no banco de dados
            if (senhaDb === senhaForms){
                console.log('Senha Correta!'); // Loga uma mensagem indicando que a senha está correta
                res
                    .status(200) // Responde com status 200 (OK) se a senha estiver correta
                    .json({
                        success: true,
                        message: "Login feito com Sucesso", // Mensagem de sucesso do login
                });        
            } else {
                // Responde com status 400 (Requisição Inválida) se a senha estiver incorreta
                res
                    .status(400)
                    .json({
                        success: false,
                        message: "Verifique sua Senha", // Mensagem de erro indicando que a senha está incorreta
                        data: results // Inclui os resultados retornados para depuração
                });  
            }
        }
    });
};

// Exporta a função login para que ela possa ser usada em outras partes da aplicação
module.exports = {
    login
};
