// Importa a configuração de conexão com o banco de dados a partir do arquivo db.js
const connection = require('../config/db.js');

// Importa o pacote dotenv para carregar variáveis de ambiente a partir do arquivo .env
const dotenv = require('dotenv').config();

// Função assíncrona para armazenar um novo usuário no banco de dados
async function storeUser(request, response) {
    // Extrai os dados do corpo da requisição e os coloca em um array para serem utilizados na query SQL
    const params = Array(
        request.body.nome,             
        request.body.data_nascimento,   
        request.body.email,            
        request.body.senha,            
        request.body.tipo_usuario,     
    );

    // Query SQL para inserir um novo registro na tabela 'usuario'
    const query = 'INSERT INTO usuario(nome, data_nascimento, email, senha, tipo_usuario) VALUES (?, ?, ?, ?, ?)';

    // Executa a query SQL com os parâmetros fornecidos
    connection.query(query, params, (err, results) => {
        console.log(err); // Loga qualquer erro que possa ocorrer durante a execução da query

        if (results) {
            // Se a inserção foi bem-sucedida, responde com status 201 (Criado) e uma mensagem de sucesso
            response 
                .status(201)
                .json({
                    success: true,
                    message: "Sucesso!", 
                    data: results          // Dados retornados pela operação
                });
            
        } else {
            // Se houve algum erro na inserção, responde com status 400 (Requisição Inválida) e uma mensagem de erro
            response
                .status(400)
                .json({
                    success: false,
                    message: "Ops, deu problema :(", 
                    data: err                         
                });
        }
    });
}


// Exporta a função storeUser para que ela possa ser usada em outras partes da aplicação
module.exports = {
    storeUser
}
