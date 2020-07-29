// EXPRESS
const express = require('express');
const app = express();

// ARCHIVOS JSON
const JsonCarreras = require('../resources/carreras.json');

// FUNCIONES
const { opcionA, opcionB, opcionC } = require('../funciones/funciones');

// MIDDLEWARES
const { verificaToken } = require('../middlewares/tokenAuth.js');

// Endpoints
// Ruta inicial
app.get('/', (req, res) => {
    res.send(`<h1>API REST - COMPUTACIÓN PARALELA Y DISTRIBUIDA</h1>`);
});

/*
    Recibe por query params el codigo de una carrera
    Retorna un json con toda la información asociada al codigo de carrera ingresado
*/
app.get('/carreras/codigo', verificaToken, (req, res) => {

    if (req.query.idcarrera === undefined) {
        res.status(400).json({
            ok: false,
            err: {  
                mensaje: 'Se debe ingresar un parametro válido'
            }
        });
    } else {
        let carrera = opcionA(JsonCarreras, req.query.idcarrera);

        if (Object.keys(carrera).length === 0) {
            res.status(404).json({
                ok: false,
                err: {
                    mensaje: `No se ha encontrado una carrera asociada con el codigo ${req.query.idcarrera}`
                }
            });
        }

        res.status(200).json({
            ok: true,
            carrera
        });
    }
});

/*
    Recibe por query params uno o varios nombres de carreras
    Retorna la información asociada a los nombres de carreras ingresados
*/
app.get('/carreras/nombre', verificaToken, (req, res) => {

    if (Object.keys(req.query).length === 0) {

        res.status(400).json({
            ok: false,
            err: {
                mensaje: 'Se requiere al menos un query param'
            }
        });

    } else {
        let carreras = opcionB(JsonCarreras, req.query);
        if (carreras.length == 0) {
            res.status(404).json({
                ok: false,
                err: {
                    mensaje: 'No se encontró información asociada a los datos ingresados'
                }
            });
        } else {
            if (carreras.length <= Object.keys(req.query).length) {
                res.status(200).json({
                    ok: true,
                    carrera: opcionB(JsonCarreras, req.query),
                    mensaje: `Se encontraron ${carreras.length} carreras de las ${Object.keys(req.query).length} recividas`
                });
            } 
        }
    }
});


/*
    Recibe por query params los puntajes necesarios para postular a una carreras
    Retorna un json que contiene las 10 carreras en las que mejor se posiciona según los puntajes ingresados
*/
app.post('/carreras/puntajes', verificaToken, (req, res) => {

    if ((Object.keys(req.body).length < 6) || req.body === undefined) {

        res.status(400).json({
            ok: false,
            err: {
                mensaje: 'Datos faltantes en el body'
            }
        });
        
    } else {
        res.status(200).json({
            ok: true,
            carreras: opcionC(req.body, JsonCarreras)
        });
    }
});


module.exports = app;
