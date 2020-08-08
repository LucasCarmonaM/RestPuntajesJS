// ==========================
// express
// ==========================
const express = require('express');
const app = express();

// ==========================
// archivos json
// ==========================
const JsonCarreras = require('../resources/carreras.json');

// ==========================
// funciones
// ==========================
const { getInfoCarrera, getInfoCarreras, getCarrerasTop } = require('../funciones/funciones');

// ==========================
// middlewares
// ==========================
const { verificaToken } = require('../middlewares/tokenAuth.js');

// ==========================
// Endpoints
// ==========================

app.get('/', (req, res) => {

    res.send(`<h1>API REST - COMPUTACIÓN PARALELA Y DISTRIBUIDA</h1>`);

});

// ==============================================================================
//    Recibe como query param el codigo de una carrera
//    Retorna un json con toda la información asociada al codigo de carrera ingresado
// ==============================================================================
app.get('/carreras/codigo', verificaToken, (req, res) => {

    // Si no se envía el id de una carrera por query param, el servidor responde al usuario con un error 400
    if (req.query.idcarrera === undefined) {
        
        res.status(400).json({
            ok: false,
            err: {  
                mensaje: 'Se debe ingresar un parametro válido'
            }
        });

    } else {  // En caso contrario se guarda en una variable lo que retorna la función 'opcionA'
        
        let carrera = getInfoCarrera(JsonCarreras, req.query.idcarrera);

        // Si la función no encuentra ninguna información asociada al código de la carrera enviado por parametro, el servidor responde con un error 404
        if (Object.keys(carrera).length === 0) {

            res.status(404).json({
                ok: false,
                err: {
                    mensaje: `No se ha encontrado una carrera asociada con el código ${req.query.idcarrera}`
                }
            });

        }

        // Si la función encuentra información asociada al código de la carrera enviada por parametro, el servidor responde con un código de estado 200
        // mostrando la información de la respectiva carrera encontrada
        res.status(200).json({
            ok: true,
            carrera
        });

    }

});

// ==============================================================================
//  Recibe como query params uno o varios nombres de carreras
//  Retorna la información asociada a los nombres de carreras ingresados
// ==============================================================================
app.get('/carreras/nombre', verificaToken, (req, res) => {

    // Si no se envía ninguna carrera como query param, el servidor responde con un error 400 describiendolo
    if (Object.keys(req.query).length === 0) {
        
        res.status(400).json({
            ok: false,
            err: {
                mensaje: 'Se requiere al menos un query param'
            }  
        });

    } else { // Por el contrario se llama a la función 'getInfoCarreras'
        
        // Se guarda en una variable lo que retorna la función 'getInfoCarreras'
        let carreras = getInfoCarreras(JsonCarreras, req.query);

        // Si no existe ninguna coincidencia, el servidor responde con un error 404 indicando que no se encontró información asociada a alguna de las carreras
        if (carreras.length === 0) {

            res.status(404).json({
                ok: false,
                err: {
                    mensaje: 'No se encontró información asociada a los datos ingresados'
                }
            });

        } else { // Caso contrario, el servidor responde con un json que contiene la información de las carreras

            res.json({
                ok: true,
                carreras
            });

        }
    }
});

// ========================================================================================================
//    Recibe a través del body de la petición los puntajes necesarios para postular a alguna carrera
//    Retorna un json que contiene las 10 carreras en las que mejor se posiciona según los puntajes ingresados
// ========================================================================================================
app.post('/carreras/puntajes', verificaToken, (req, res) => {

    // Si hay algún puntaje que no se ingresó en el body, el servidor responde con un error 400 indicando que faltan parametros en el body
    if ((Object.keys(req.body).length < 6) || req.body === undefined) {

        res.status(400).json({
            ok: false,
            err: {
                mensaje: 'Parametros requeridos en el body'
            }
        });
        
    } else { // Por el contrario, si todos los puntajes se ingresan correctamente se procede a llamar a la función "opcionC"

        // Se guarda en una variable lo que retorna la función "opcionC"
        let carreras = getCarrerasTop(JsonCarreras, req.body);

        // Si no existe ninguna carrera a la que se pueda postular con los puntajes, el servidor responde con un mensaje informativo
        if(carreras.length === 0){

            res.json({
                ok: true,
                mensaje: 'La ponderación final no cumple con los requisitos mínimos para poder postular a lo menos a alguna carrera'
            });

        } else { // En el caso contrario, el servidor responde con un json que contiene las mejores 10 opciones de carreras
            
            res.json({
                ok: true,
                carreras
            });

        }

    }
});


module.exports = app;
