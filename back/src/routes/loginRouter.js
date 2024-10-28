// Importa a função Router do Express, que permite criar rotas modulares e separadas para a aplicação
const { Router } = require("express");

// Cria uma nova instância do roteador para definir as rotas relacionadas ao login
const router = Router();

// Importa a função login do controller de login
// Essa função é responsável por lidar com a lógica de autenticação de usuários
const { login } = require("../controller/loginController");

/**
 * @swagger
 * /post/login:
 *  post:
 *    summary: Cadastra uma nova tarefa
 *    responses:
 *      201:
 *        description: Sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
*/
router.post('/post/login', login);

module.exports = router;