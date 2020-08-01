const express = require('express');
const app = express();

const jwt = require('jsonwebtoken');

let userFile = require('../resources/usuarios.json');

app.post('/autenticacion', (req, res) => {

    let body = req.body;
    let users = userFile;

    users.forEach((user) => {
        if (body.usuario === user.usuario && body.password == user.password) {

            // Genera un token
            let token = jwt.sign({ usuario: body.usuario },
                process.env.SEED_JWT, { expiresIn: process.env.EXPIRATION_TOKEN });

            res.status(200).json({
                ok: true,
                token
            });

        } else {
            res.status(400).json({
              ok: false,
              err: {
                  message: 'No existe usuario asociado a las credenciales ingresadas'
              }
            });
        }
    });

});

module.exports = app;