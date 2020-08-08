// ==========================
// express
// ==========================
const express = require('express');
const app = express();

// ==========================
// jsonwebtoken
// ==========================
const jwt = require('jsonwebtoken');

// ==========================
// Archivo de usuarios
// ==========================
let userFile = require('../resources/usuarios.json');

app.post('/autenticacion', (req, res) => {

    // Se obtienen las credenciales a través del body de la petición
    let body = req.body;

    // Se obtienem los usuarios del archivo usuarios.json
    let users = userFile;
    
    // Si las credenciales de usuario ingresadas coinciden, se procede a crear un token
    users.forEach((user) => {
        if (body.usuario == user.usuario && body.password == user.password) {

            // Genera un token
            let token = jwt.sign({ usuario: body.usuario },
                process.env.SEED_JWT, { expiresIn: process.env.EXPIRATION_TOKEN });
            
            // Se envía el token a través de un formato json
            res.json({
                ok: true,
                token
            });

        } else { // Si las credenciales no coinciden, el servidor responde con un codigo 401 indicando que el usuario no existe o no está autorizada
            res.status(401).json({
              ok: false,
              err: {
                  mensaje: 'No existe usuario asociado a las credenciales ingresadas'
              }
            });
        }
    });

});

module.exports = app;