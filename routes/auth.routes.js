const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken, verificarEmail, actualizaPassword, deleteUser } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

// Crear un nuevo usuario
router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    validarCampos
], crearUsuario);

// Login de usuario
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').isLength({min: 6}),
    validarCampos
], loginUsuario);

router.post('/update/password', actualizaPassword);

// Validar y revalidar token
router.get('/renew', validarJWT, revalidarToken);

// Validar email
router.get('/email', verificarEmail);

module.exports = router;
