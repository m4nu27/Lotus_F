// Importa o pool de conexões para o banco de dados, configurado no arquivo db.js
const pool = require('../config/db');

// Função para armazenar um post no banco de dados
// Essa função recebe o título e a legenda de um post através do corpo da requisição e insere esses dados na tabela `posts`.
async function storeForum(request, response) {
    console.log("storeForum chamado com dados:", request.body);  // Log para debug, mostra os dados recebidos

    // Desestrutura os campos `titulo` e `legenda` do corpo da requisição
    const { titulo, legenda } = request.body;

    // Validação: verifica se os campos obrigatórios foram enviados
    if (!titulo || !legenda) {
        return response.status(400).json({
            success: false,                  // Indica falha na requisição
            message: "Título e legenda são obrigatórios!" // Mensagem de erro
        });
    }

    // Declara a consulta SQL para inserir os dados na tabela `posts`
    const query = "INSERT INTO posts(titulo, legenda) VALUES(?, ?)";

    try {
        // Executa a consulta SQL usando o pool de conexões
        const [results] = await pool.query(query, [titulo, legenda]);

        // Caso a inserção seja bem-sucedida
        return response.status(200).json({
            success: true,                       // Indica sucesso
            message: "Post inserido com sucesso!", // Mensagem de sucesso
            data: results                        // Retorna os dados da inserção
        });
    } catch (err) {
        // Caso ocorra um erro na execução da consulta
        return response.status(400).json({
            success: false,                   // Indica falha
            message: "Erro ao inserir o post", // Mensagem de erro
            error: err.message || err,        // Retorna a mensagem detalhada do erro
            sql: err                          // Inclui o erro completo para fins de debug
        });
    }
}

// Função para buscar todos os posts no banco de dados
// Essa função retorna todos os registros da tabela `posts`.
async function getPost(request, response) {
    // Declara a consulta SQL para buscar todos os posts
    const query = "SELECT * FROM posts";

    try {
        // Executa a consulta SQL usando o pool de conexões
        const [results] = await pool.query(query);

        // Caso a consulta seja bem-sucedida
        return response.status(200).json({
            success: true,                      // Indica sucesso
            message: "Posts retornados com sucesso!", // Mensagem de sucesso
            data: results                       // Retorna os posts encontrados
        });
    } catch (err) {
        // Caso ocorra um erro na execução da consulta
        return response.status(500).json({
            success: false,                  // Indica falha
            message: "Erro ao buscar os posts", // Mensagem de erro
            error: err.message || err         // Retorna a mensagem detalhada do erro
        });
    }
}

// Exporta as funções `storeForum` e `getPost` para serem utilizadas em outras partes do sistema
module.exports = {
    storeForum,
    getPost
};
