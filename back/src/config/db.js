// Importa o pacote do MySQL para permitir a conexão com o banco de dados MySQL
const mysql = require("mysql2");

// Importa o pacote 'dotenv' para carregar variáveis de ambiente a partir de um arquivo .env
const dotenv = require("dotenv").config();

// Estabelece a criação da conexão com o banco de dados MySQL
// As configurações da conexão (host, usuário, senha, nome do banco de dados) são obtidas das variáveis de ambiente
const connection = mysql.createConnection({
  host: process.env.DB_HOST,         // Endereço do servidor do banco de dados (ex: 'localhost')
  user: process.env.DB_USER,         // Nome de usuário para acessar o banco de dados (ex: 'root')
  password: process.env.DB_PASSWORD, // Senha para acessar o banco de dados (ex: 'root')
  database: process.env.DB_DATABASE, // Nome do banco de dados que será utilizado (ex: 'db_Lotus')
});

// Código comentado que exemplifica valores padrão que poderiam ser usados diretamente (sem variáveis de ambiente)
// HOST: 'localhost',
// USER: 'root',
// PASSWORD: 'root',
// DATABASE: 'db_Lotus',


// Testa a conexão com o banco de dados
connection.connect((err) => {
  if (err) {
    throw err; // Se houver erro na conexão, lança uma exceção
  } else {
    console.log("Mysql Connected!"); // Exibe uma mensagem de sucesso no console
  }
});

// Exporta a conexão para que ela possa ser utilizada em outros módulos do projeto
module.exports = connection;

