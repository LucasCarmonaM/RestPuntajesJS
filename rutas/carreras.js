/* EXPRESS */
const express = require('express');
const app = express();

/* ARCHIVOS JSON */
const userFile = require('../resources/usuarios.json');
const JsonCarreras = require('../resources/carreras.json');

/* FUNCIONES */
const funct = require('../funciones/trabajoJson');

/* JSONWEBTOKEN */
const jwt = require('jsonwebtoken');

/* MIDDLEWARES */
const { verificaToken } = require('../middlewares/tokenAuth.js');


app.post('/autenticar', (req, res) => {

    let body = req.body;
    let users = userFile;
    //[ { usuario: 'Admin', 'password': 1234 } ]

    users.forEach((user) => {
        if (body.usuario === user.usuario && body.password == user.password) {

            let token = jwt.sign({ usuario: body.usuario },
                'mi-llave-secreta', { expiresIn: 60 * 60 });

            res.status(200).json({
                ok: true,
                token: token
            });


        } else {
            res.status(400).json({ Error: 'usuario no existe', status: 400 });
        }
    });

});


app.get('/', verificaToken, (req, res) => {

});

app.get('/Opcion1', verificaToken, (req, res) => {

    if (req.query.idcarrera === undefined) {
        res.status(400).json({
            ok: false,
            err: {
                mensaje: 'Se debe ingresar un parametro valido'
            },
            Status: 400
        });
    } else {
        res.status(200).json({
            ok: true,
            carrera: funct.opcionA(JsonCarreras, req.query.idcarrera)
        });
    }
});


app.get('/Opcion2', verificaToken, (req, res) => {

    if (Object.keys(req.query).length === 0) {

        res.status(400).json({
            ok: false,
            err: {
                mensaje: 'Se requiere al menos un query param'
            }
        });

    } else {
        var a = funct.opcionB(JsonCarreras, req.query);
        if (a.length == 0) {
            res.status(404).json({
                ok: false,
                err: {
                    mensaje: 'No se encontraron carreras con los nombres recividos'
                }
            });
        } else {
            if (a.length < Object.keys(req.query).length) {
                res.status(200).json({
                    ok: true,
                    carrera: funct.opcionB(JsonCarreras, req.query),
                    mensaje: `Se encontraron ${a.length} carreras de las ${Object.keys(req.query).length} recividas`
                });
            } else {
                res.status(200).json({
                    ok: true,
                    carrera: funct.opcionB(JsonCarreras, req.query)
                });
            }
        }
    }
});

app.post('/Opcion3', verificaToken, (req, res) => {

    if ((Object.keys(req.body).length < 6) || req.body === undefined) {

        res.status(400).json({
            ok: false,
            err: {
                mensaje: 'Datos requeridos en el body'
            }
        })
    } else {
        res.status(200).json({
            ok: true,
            carreras: funct.opcionC(JsonCarreras, req.body)
        });
    }
});


module.exports = app;