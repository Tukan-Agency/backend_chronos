const { response } = require('express');
const Request = require('../models/Request');

// Crear un nuevo retiro
const createRequest = async (req, res = response) => {

    try {
        // Crear request model
		delete req.body.request._id;
        const dbRequest = new Request(req.body.request);
        // Crear request BD
        await dbRequest.save();

        // Generar respuesta
        return res.status(201).json({
            ok: true,
            uid: dbRequest.id,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el  administrador'
        })
    }
}

// Obtener Request
const getRequest = async (req, res) => {
    const requests = await Request.find({});

    return res.json({
        ok: true,
        requests
    });
}

// Actualizar Request
const actualizarEstado = async(req, res) => {
    const requestUpdate = req.body;
    try {
        await Request.findByIdAndUpdate(requestUpdate._id, {
            requestStatus: requestUpdate.status
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

module.exports = {
    createRequest,
    getRequest,
    actualizarEstado
}
