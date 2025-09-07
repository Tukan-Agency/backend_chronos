const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./db/config');
require('dotenv').config();
const path = require('path');

// Crear el servidor/aplicacion
const app = express();

// Base de datos
dbConnection();

// Directorio Público
app.use(express.static('public'));

// CORS
app.use(cors());

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/clients', require('./routes/clients.routes'));
app.use('/api/orders', require('./routes/orders.routes'));
app.use('/api/package', require('./routes/package.routes'));
app.use('/api/movimientos', require('./routes/movimientos.routes'));
app.use('/api/request', require('./routes/request.routes'));
app.use('/api/news', require('./routes/news.routes'));

// Manejar rutas
app.get('*', () => (req, res) => {
    res.sendFile(path.sendFile(__dirname, 'public/index.html'));
});

// Cargar en puerto *NO TOCAR*
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
});

