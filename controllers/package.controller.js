const { response } = require('express');
const Package = require('../models/Package');

// Crear package
const crearPackage = async(req, res = response) => {
    try {
        const dbPackage = new Package(req.body.pack);

        await dbPackage.save();

        return res.status(201).json({
            ok: true,
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }
}

const obtenerPackages = async (req, res) => {
    const packages = await Package.find({});
    
    return res.json({
        ok: true,
        packages
    });
}

module.exports = {
    crearPackage,
    obtenerPackages
}