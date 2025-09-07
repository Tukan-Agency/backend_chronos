const { response } = require('express');
const News = require('../models/News');

// Obtener news
const obtenerNoticia = async(req, res) => {
    const news = await News.find({});

    return res.json({
        ok: true,
        news
    })
}

// ActualizarEstado
const actualizarNoticia = async(req, res) => {
    const newsUpdate = req.body;

    try {
        const updatedNew = await News.findByIdAndUpdate(newsUpdate._id, {
            new: newsUpdate.news
        });

		if(updatedNew === null || updatedNew === undefined){
			try{
				const newCreated = await News.create({_id: newsUpdate._id, new: newsUpdate.new})
				await newCreated.save()
				await News.findByIdAndUpdate(newsUpdate._id, {
					new: newsUpdate.news
				});
			}catch (error){
				console.log(error);
			}
		}

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
    actualizarNoticia,
    obtenerNoticia,
}
