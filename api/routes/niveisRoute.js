const { Router } = require('express');
const NivelController = require('../controllers/NivelController');

const router = Router();

router
    .get('/niveis', NivelController.pegaTodosOsNives)
    .get('/niveis/:id', NivelController.pegaUmNivel)
    .post('/niveis', NivelController.criaNivel)
    .post('/niveis/:id/restaura', NivelController.restauraNivel)
    .put('/niveis/:id', NivelController.atualizaNivel)
    .delete('/niveis/:id', NivelController.deletaNivel);

module.exports = router;
