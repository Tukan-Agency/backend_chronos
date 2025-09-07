const { response } = require('express');
const Movimiento = require('../models/History');
const Request = require('../models/Request');
const Order = require("../models/Order");


// Crear una nueva orden
const crearMovimiento = async(req, res = response) => {
    try {
        let movimiento;
        if (req.body.type === 'Paquete') {
            movimiento = await Movimiento.findOne({clientId: req.body.clientId});
        }

        if (movimiento) {
            await Movimiento.findOneAndUpdate({clientId: movimiento.clientId}, {
                clientName: req.body.clientName,
                requestDate: req.body.requestDate,
				requestId: req.body.requestId,
                status: req.body.status,
                value: req.body.value
            });
        } else {
            // Crear orden model
            const dbMovimiento = new Movimiento(req.body);

            // Crear orden de BD
            await dbMovimiento.save();

            // Generar respuesta exitosa
            return res.status(201).json({
                ok: true,
				status: 200
            });
        }

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

// Obtener movimientos
const obtenerMovimientos = async(req, res) => {
    const movimientos = await Movimiento.find({});

    return res.json({
        ok: true,
        movimientos
    })
}

// Obtener movimientos byPaquete
const obtenerMovimientosPaquete = async(req, res) => {
    const movimientos = await Movimiento.find({type: 'Paquete'});

    return res.json({
        ok: true,
        movimientos
    })
}

//  Obtener Moviemientos byCliente
const obtenerMovimientosCliente = async(req, res) => {
    const clientId = req.header('x-clientId');
    const movimientos = await Movimiento.find({ clientId: clientId});

    return res.json({
        ok: true,
        movimientos
    })
}

//  delete movement
const deleteMovement = async(req, res) => {
	try{
		const requestId = req.header('x-requestId');
		const movementId = req.header('x-movementId')
		await Movimiento.findByIdAndDelete(movementId);
		await Request.findByIdAndDelete(requestId);
		await Order.findByIdAndDelete(requestId);
		return res.json({
			ok: true
		})
	}catch (e) {
		return res.json({
			error: e
		})
	}
}

// ActualizarEstado
const actualizarEstado = async(req, res) => {
    const movimientoUpdate = req.body;
    try {
        await Movimiento.findByIdAndUpdate(movimientoUpdate._id, {
            status: movimientoUpdate.status
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
    crearMovimiento,
    obtenerMovimientos,
    obtenerMovimientosPaquete,
    actualizarEstado,
    obtenerMovimientosCliente,
	deleteMovement
}
