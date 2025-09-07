const { Router } = require('express');
const { obtenerClientes, actualizarPaquete } = require('../controllers/clients.controller');
const { actualizarCliente } = require('../controllers/clients.controller');
const {deleteUser} = require("../controllers/auth.controller");

const router = Router();

// Obtener Clientes
router.get('/all', obtenerClientes);
router.post('/update', actualizarCliente);
router.post('/update/package', actualizarPaquete);
router.delete('/:ID', deleteUser);


module.exports = router;
