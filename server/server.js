// Resources
const FileJson = require('../resources/jsonFile.json');
const JsonCarreras = require('../resources/carreras.json');
const express = require('express');
const funct = require('../funciones/trabajoJson');
const { response } = require('express');

/* funct.Redondear(FileJson); */
/* funct.rutRep(FileJson); */




//Config server
process.env.PORT = process.env.PORT || 3000;
app = express();


// Json response para opcion -c
const ResC = {};

// URL
app.get('/', (req, res) => {
    console.log(req.query);
    funct.Redondear(FileJson);
    if (req.query.opcion === 'c') {
        FileJson.forEach((carrera, index) => {
            if (carrera.Codigo === parseInt(req.query.idcarrera)) {
                res.status(200).json(carrera);
            }
        })
    }

})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
    console.table(FileJson);
})