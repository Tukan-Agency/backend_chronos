const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Order = require("../models/Order");

// Verificar email
const verificarEmail = async(req, res) => {
    const email = req.header('x-email');

    const usuario = await Usuario.findOne({ email: email });

    if (usuario) {
        return res.status(400).json({
            ok: false,
            msg: 'Usuario ya existe con ese email'
        });
    }

    return res.status(200).json({
        ok: true,
        msg: 'Ok'
    });
}

// Crear un nuevo usuario
const crearUsuario = async(req, res = response) => {
    const { email, name, password } = req.body;

    try {
        // Verificar el email
        const usuario = await Usuario.findOne({ email: email });

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya existe con ese email'
            });
        }
		const currentMaxUser = await Usuario.findOne({sequenceId:{ $exists: true }}).sort({sequenceId : -1})
		req.body.sequenceId = currentMaxUser.sequenceId +1

        // Crear usuario model
        const dbUser = new Usuario(req.body);

        // Hash contraseña
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync(password, salt);

        // Generar JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // Crear usuario de BD
        await dbUser.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbUser.id,
            name: name,
            token: token
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteUser = async(req, res = response) => {
	const password = req.body;
	try {
		await Usuario.findByIdAndDelete(req.params.ID);

		return res.json({
			ok: true
		});

	} catch (error) {
		console.log(error);

		return res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador'
		});
	}
}

const actualizaPassword = async(req, res = response) => {
    const password = req.body;
    try {

        // Hash contraseña
        const salt = bcrypt.genSaltSync();
        password.password = bcrypt.hashSync(password.password, salt);

        await Usuario.findByIdAndUpdate(password._id, {
            password: password.password
        });

        return res.json({
            ok: true
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

// Login de usuario
const loginUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const dbUser =  await Usuario.findOne({ email: email });

        if (!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no son validas'
            });
        }

        // Confirmar match del password
        const validPassword = bcrypt.compareSync(password, dbUser.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales no son validas'
            });
        }

        // Generar el JWT
        const token = await generarJWT(dbUser.id, dbUser.name);

        // Respuesta servicio
        return res.json({
            ok: true,
            user: dbUser,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

// Validar y revalidar token
const revalidarToken = async(req, res) => {
  console.log('[RENEW] UID recibido:', req.uid);

  const user = await Usuario.findById(req.uid);

  console.log('[RENEW] Usuario encontrado:', user);

  const token = await generarJWT(req.uid, user.name);

  return res.json({
    ok: true,
    token,
    user
  });
}
module.exports = {
    
    crearUsuario,
    loginUsuario,
    revalidarToken,
    verificarEmail,
    actualizaPassword,
	deleteUser
}
