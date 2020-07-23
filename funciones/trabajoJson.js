const jsonFile = require('../resources/jsonFile.json');
const JsonCarreras = require('../resources/carreras.json');

const Redondear = (jsonFile) => {
    jsonFile.forEach((carrera) => {
        carrera.Persona.forEach((persona) => {
            persona.pondera = Math.round(persona.pondera * 100) / 100;
        })
    });
    /* jsonFile.forEach((carrera) => {
        console.log(carrera);
    }); */
}

const imprimir = (json) => {
    json.forEach((persona) => {
        console.log(persona);
    })
}

const rutRep = (json) => {
    var cantidadPerson = 0;

    json.forEach((carrera) => {
        carrera.Persona.forEach((persona) => {
            console.log(persona);
            if ('19202154' === persona.rut) {
                cantidadPerson += 1;
            }
        })
    })
    console.log(cantidadPerson);
}

const opcionC = (json1, json2) => {
    const jsonRes = {};
    json2.forEach((carrera) => {

    })
}


module.exports = {
    imprimir,
    Redondear,
    rutRep
}