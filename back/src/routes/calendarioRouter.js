const { Router } = require('express');
const router = Router();
const { registrarEmocao } = require('../controller/calendarioController');
const { obterEmocoes } = require('../controller/calendarioController');

// Rota para registrar emoção
router.post('/registrar-emocao', registrarEmocao);

// Rota para obter emoções de uma data específica
router.get('/obter-emocoes', obterEmocoes);

module.exports = router;

