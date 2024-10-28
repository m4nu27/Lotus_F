const { Router } = require('express');
const router = Router();
const { registrarEmocao } = require('../controller/calendarioController');

// Rota para registrar emoção
router.post('/registrar-emocao', registrarEmocao);

// Rota para obter emoções por data
//router.get('/obter-emocoes/:data', calendarioController.obterEmocoesPorData);

module.exports = router;
