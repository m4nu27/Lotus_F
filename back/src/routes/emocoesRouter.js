const express = require('express');
const router = express.Router();
const emocoesController = require('../controllers/emocoesController');

// Rota para registrar emoção
router.post('/registrar-emocao', emocoesController.registrarEmocao);

module.exports = router;
