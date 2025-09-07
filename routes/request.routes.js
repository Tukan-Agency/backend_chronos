const { Router } = require('express');
const { createRequest, getRequest, actualizarEstado } = require('../controllers/request.controller');

const router = Router();

router.post('/new', createRequest);
router.get('/all', getRequest);
router.post('/update/status', actualizarEstado);

module.exports = router;