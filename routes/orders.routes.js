const { Router } = require('express');
const { crearOrden, obtenerOrdenes, obtenerOrdenesBycLient, actualizarEstadoFinalizado, actualizarEstado, UpdateOrder, deleteOrder } = require('../controllers/orders.controller');

const router = Router();

router.get('/all', obtenerOrdenes);
router.get('/client', obtenerOrdenesBycLient);
router.put('/update', UpdateOrder);
router.post('/new', crearOrden);
router.post('/update/status', actualizarEstado);
router.post('/update/status/end', actualizarEstadoFinalizado);
router.delete('/delete/:ID', deleteOrder);

module.exports = router;
