const { Router } = require('express');
const { crearPackage, obtenerPackages } = require('../controllers/package.controller');

const router = Router();

router.post('/new', crearPackage);
router.get('/all', obtenerPackages);

module.exports = router;