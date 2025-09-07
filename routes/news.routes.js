const { Router } = require('express');
const { obtenerNoticia, actualizarNoticia } = require('../controllers/news.controller');

const router = Router();

router.get('/obtener', obtenerNoticia);
router.post('/actualizar', actualizarNoticia);

module.exports = router;