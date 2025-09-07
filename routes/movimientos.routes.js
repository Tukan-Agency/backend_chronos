const { Router } = require('express');
const {
	crearMovimiento,
	obtenerMovimientos,
	obtenerMovimientosPaquete,
	actualizarEstado,
	obtenerMovimientosCliente,
	deleteMovement
} = require('../controllers/movimientos.controller');

const router = Router();

router.post('/new', crearMovimiento);
router.get('/all', obtenerMovimientos);
router.get('/package', obtenerMovimientosPaquete);
router.post('/update/status', actualizarEstado);
router.get('/clientId', obtenerMovimientosCliente);
router.delete('/delete', deleteMovement);

module.exports = router;
