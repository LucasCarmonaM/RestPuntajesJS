// Resources
const express = require('express');
const { response, json } = require('express');


/* funct.Redondear(FileJson); */
/* funct.rutRep(FileJson); */

//Config server
process.env.PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Json response para opcion -c
const ResC = {};

app.use(require('../rutas/carreras.js'));


app.listen(process.env.PORT, () => {
    console.log(`Escuchando el puerto ${process.env.PORT}`);
    // Pruebas
})