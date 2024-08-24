// Importa a função Router do Express, que permite criar rotas modulares e separadas para a aplicação
const { Router } = require("express");

// Cria uma nova instância do roteador para definir as rotas relacionadas ao login
const router = Router();

// Importa a função login docontroller de login
// Essa função é responsável por lidar com a lógica de autenticação de usuários
const { login } = require("../controller/loginController");

// Define uma rota POST para '/post/login', que chama a função login quando a rota é acessada
// Essa rota é usada para processar solicitações de login, onde o cliente envia as credenciais (email e senha)
router.post('/post/login', login);

// Exporta o roteador para que ele possa ser utilizado em outras partes da aplicação
// Isso permite que as rotas definidas aqui sejam montadas e acessadas no aplicativo principal
module.exports = router;
