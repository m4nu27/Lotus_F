// Importa a função Router do Express, que permite criar rotas modulares e separadas para a aplicação
const { Router } = require('express');

// Cria uma nova instância para definir as rotas relacionadas a usuários
const userRouter = Router();

// Importa a função storeUser do controller do cadastro
const { storeUser } = require('../controller/cadastroController');

// Define uma rota POST para '/store/user', que chama a função storeUser quando a rota é acessada
// Essa rota é usada para criar (armazenar) um novo usuário no banco de dados
userRouter.post('/store/user', storeUser);

// Exporta o userRouter para que ele possa ser utilizado em outras partes da aplicação
// Isso permite que as rotas definidas aqui sejam montadas no aplicativo principal
module.exports = userRouter;

const {
    taskCadastro
} = require('../controller/cadastroController')

/**
 * @swagger
 * /post/cadastro:
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
router.post('/post/cadastro', taskCadastro);
