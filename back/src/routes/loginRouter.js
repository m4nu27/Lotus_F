// //importar o express, que faz o gerenciamento de conexões com a api no javascript
// const {Router} = require('express');

// //fazer o controle de rotas, onde cada rota é uma URL de acesso 
// const router = Router(); 

// //pegar o arquivo do controller e botar no router
// const { login, getId } = require('../controller/loginController'); 

// //começar a contruir os métodos
// router.post('/login', login);
// router.get('/login/id', getId);

// module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);

module.exports = router;