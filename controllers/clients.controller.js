const Usuario = require('../models/Usuario');
const bcrypt = require("bcryptjs");

const obtenerClientes = async (req, res) => {
    const clientes = await Usuario.find({});

    return res.json({
        ok: true,
        clientes
    })
}

const actualizarCliente = async (req, res) => {
    const userUpdate = req.body;
	const newValue = {
		name: req.body.name,
		surname: req.body.surname,
		birthday: req.body.birthday,
		email: req.body.email,
		address: req.body.address,
		company: req.body.company,
		contactNumber: req.body.contactNumber,
		whatsapp: req.body.whatsapp,
		country: req.body.country,
		currency: req.body.currency
	}
	if(userUpdate.password !== ""){
		console.log(userUpdate.password, userUpdate.password !== undefined, userUpdate.password !== "")
		const salt = bcrypt.genSaltSync();
		newValue.password = bcrypt.hashSync(req.body.password, salt);
	}
    await Usuario.findByIdAndUpdate(userUpdate._id, newValue);

    return res.json({
        ok: true
    })
}

const actualizarPaquete = async(req, res) => {
    const userUpdate = req.body;

    await Usuario.findByIdAndUpdate(userUpdate._id, {
        package: {
            packageId: userUpdate.package._id,
            packageName: userUpdate.package.name
        }
    });

    return res.json({
        ok: true
    });
}

module.exports = {
    obtenerClientes,
    actualizarCliente,
    actualizarPaquete
}
