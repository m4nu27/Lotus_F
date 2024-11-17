const express = require('express');
const router = express.Router();
const { getPerfis, deletePerfil } = require('../controller/perfilController');

// Rota para listar todos os perfis
router.get('/perfis', getPerfis);

// Rota para excluir um perfil
router.delete('/perfis/:id', deletePerfil);

module.exports = router;
