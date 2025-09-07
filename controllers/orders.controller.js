const { response } = require('express');
const Order = require('../models/Order');
const Movimiento = require("../models/History");
const Request = require("../models/Request");

// Crear una nueva orden
const crearOrden = async(req, res = response) => {
    try {
        // Crear orden model
        const dbOrder = new Order(req.body.orden);

        // Crear orden de BD
        await dbOrder.save();

        // Generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            uid: dbOrder.id,
            operationNumber: dbOrder.operationNumber,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

// Obtener ordenes
const obtenerOrdenes = async(req, res) => {
    const ordenes = await Order.find({});

    return res.json({
        ok: true,
        ordenes
    })
}

// Obtener orden by client
const obtenerOrdenesBycLient = async(req, res) => {
    const clientId = req.header('x-clientId');

    const ordenes = await Order.find({ clientId: clientId });
    return res.json({
        ok: true,
        ordenes
    })
}

// Update order

const UpdateOrder = async(req, res) => {
	const orderUpdate = req.body;

	try {
		const valuesToUpdate = {
			operationActions: orderUpdate.operationActions
		}
		if(orderUpdate.operationDate){
			valuesToUpdate.operationDate = new Date (orderUpdate.operationDate)
		}
		await Order.findByIdAndUpdate(orderUpdate._id, valuesToUpdate);

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

// ActualizarEstado
const actualizarEstado = async(req, res) => {
    const orderUpdate = req.body;

    try {
        await Order.findByIdAndUpdate(orderUpdate._id, {
            operationStatus: orderUpdate.status
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

// ActualizarEstadoyValorFinal
const actualizarEstadoFinalizado = async(req, res) => {
    const orderUpdate = req.body;
    try {
        await Order.findByIdAndUpdate(orderUpdate._id, {
            operationStatus: orderUpdate.status,
            operationValue: orderUpdate.operationValue,
			operationActions: orderUpdate.operationActions
        });

		return res.status(200).json({
			ok: true,
			status: 200
		});

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
}

const deleteOrder = async(req, res) => {
	try {
		await Order.findByIdAndDelete(req.params.ID);

		await Movimiento.findOneAndDelete({requestId: req.params.ID});

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
	return res.json({
		ok: true
	});
}

module.exports = {
    crearOrden,
    obtenerOrdenes,
    obtenerOrdenesBycLient,
    actualizarEstado,
    actualizarEstadoFinalizado,
	UpdateOrder,
	deleteOrder
}
