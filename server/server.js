// Modulos requeridos
const express = require('express');

// Configuración del server
process.env.PORT = process.env.PORT || 3000;
process.env.SEED_JWT = process.env.SEED_JWT || 'mi-llave-secreta';
process.env.EXPIRATION_TOKEN = process.env.EXPIRATION_TOKEN || 60 * 60 * 24 * 30;

const app = express();

// Middlewares para que el servidor entienda archivos json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Json response para opcion -c
const ResC = {};


// Rutas

app.use(require('../rutas/carreras.js'));
app.use(require('../rutas/autenticacion'));




// Iniciación del servidor

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
});