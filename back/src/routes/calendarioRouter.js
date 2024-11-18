const express = require('express');
const router = express.Router();
const calendarioController = require('../controller/calendarioController');

router.post('/registrar-emocao', calendarioController.registrarEmocao);
// router.get('/obter-emocoes/:data', calendarioController.obterEmocoes);

module.exports = router;