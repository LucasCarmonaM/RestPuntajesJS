// ==========================
// Modulos requeridos
// ==========================
const express = require('express');

// ==========================
// Variables de entorno
// ==========================
process.env.PORT = process.env.PORT || 3000;
process.env.SEED_JWT = process.env.SEED_JWT || 'mi-llave-secreta';
process.env.EXPIRATION_TOKEN = process.env.EXPIRATION_TOKEN || 60 * 60 * 24 * 30;


const app = express();

// ====================================================
// Middlewares para que el servidor entienda archivos json
// ====================================================
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// ==========================
// Rutas
// ==========================
app.use('/api', require('../routes/carreras.js'));
app.use('/api', require('../routes/autenticacion.js'));

// ====================================================
// Iniciación del servidor en un puerto establecido
// ====================================================
app.listen(process.env.PORT, () => {
    console.log(`App corriendo en http://localhost:${process.env.PORT}`);
});

