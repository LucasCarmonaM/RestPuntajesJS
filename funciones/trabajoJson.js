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

// Funcion para imprimir un json solamente, para pruebas
const imprimir = (json) => {
    json.forEach((persona) => {
        console.log(persona);
    });
}

//Funcion para ver si un rut se repite en mas de una carrera
const rutRep = (json) => {
    var cantidadPerson = 0;

    json.forEach((carrera) => {
        carrera.Persona.forEach((persona) => {
            console.log(persona);
            if ('19202154' === persona.rut) {
                cantidadPerson += 1;
            }
        })
    });
    console.log(cantidadPerson);
}

//Funcion para retornar el json de la opcion 'c' al cliente como response
const opcionA = (json2, codigoCarrera) => {
    var jsonRes = {
        nombreCarrera: '',
        codigoCarrera: '',
        Nem: '',
        Ranking: '',
        Lenguaje: '',
        Matematica: '',
        HistoriaOCiencias: '',
        PuntajePromedio: '',
        MinimoPostulacion: 0,
        PromLenMat: 450,
        MinPonderado: 450,
        Vacantes: '',
        PrimerMatri: '',
        UltimoMatri: ''
    };
    var promedio = 0;


    // Recorre json2 el cual contiene mas datos de las carreras
    json2.forEach((carrera) => {
        if (carrera.codigo === parseInt(codigoCarrera)) {
            jsonRes = {
                nombreCarrera: carrera.nombreCarrera,
                codigoCarrera: carrera.codigo,
                Nem: carrera.nem,
                Ranking: carrera.ranking,
                Lenguaje: carrera.lenguaje,
                Matematica: carrera.matematica,
                HistoriaOCiencias: carrera.cienciasHistoria,
                PuntajePromedio: (carrera.primero + carrera.utlimo) / 2,
                Vacantes: carrera.vacantes,
                PrimerMatri: carrera.primero,
                UltimoMatri: carrera.ultimo
            };
        }
    });
    return jsonRes;
}


const opcionB = (json2, NombreCarrera) => {
    var ArrRes = [];
    var jsonRes = {
        nombreCarrera: '',
        codigoCarrera: '',
        Nem: '',
        Ranking: '',
        Lenguaje: '',
        Matematica: '',
        HistoriaOCiencias: '',
        PuntajePromedio: '',
        MinimoPostulacion: 0,
        PromLenMat: 450,
        MinPonderado: 450,
        Vacantes: '',
        PrimerMatri: '',
        UltimoMatri: ''
    };
    var promedio = 0;


    // Recorre json2 el cual contiene mas datos de las carreras   

    for (let prop in NombreCarrera) {
        json2.forEach((carrera) => {
            if (carrera.nombreCarrera == NombreCarrera[prop]) {
                const promedio = (carrera.primero + carrera.ultimo) / 2;
                jsonRes = {
                    nombreCarrera: carrera.nombreCarrera,
                    codigoCarrera: carrera.codigo,
                    Nem: carrera.nem,
                    Ranking: carrera.ranking,
                    Lenguaje: carrera.lenguaje,
                    Matematica: carrera.matematica,
                    HistoriaOCiencias: carrera.cienciasHistoria,
                    PuntajePromedio: (carrera.primero + carrera.ultimo) / 2,
                    Vacantes: carrera.vacantes,
                    PrimerMatri: carrera.primero,
                    UltimoMatri: carrera.ultimo
                };
                ArrRes.push(jsonRes);
            }
        });
    }

    return ArrRes;
}



const opcionC = (json, body) => {
    var posiciones = [];
    var carreraPosicion = {
        carrera: '',
        posicion: ''
    }
    var Factor = 0;

    var puntaje = 0;
    var HoC = 0;

    // usar ciencias o historia
    if (body.Ciencias > body.Historia) {
        HoC = body.Ciencias;
    } else {
        HoC = body.Historia;
    }

    json.forEach((carrera) => {
        puntaje = (body.Nem * (carrera.nem / 100)) + (body.Ranking * (carrera.ranking / 100)) + (body.Matematica * (carrera.matematica / 100)) + (body.Lenguaje * (carrera.lenguaje / 100)) + (HoC * (carrera.cienciasHistoria / 100));

        Factor = (carrera.primero - carrera.ultimo) / carrera.vacantes;
        if (puntaje > carrera.primero) {
            carreraPosicion = {
                nombreCarrera: carrera.nombreCarrera,
                codCarrera: carrera.codigo,
                puntaje: puntaje,
                posicion: 1
            }
        }
        if (puntaje < carrera.ultimo) {
            //Continue
        }
        if (puntaje > carrera.ultimo) {
            carreraPosicion = {
                nombreCarrera: carrera.nombreCarrera,
                codCarrera: carrera.codigo,
                puntaje: puntaje,
                posicion: Math.round((puntaje - carrera.ultimo) / Factor)
            }
        }
        posiciones.push(carreraPosicion);
        // ponderaciones por universidad donde el index es la universidad
    });

    // Ordena el array de acuerdo a la posicion
    posiciones.sort((a, b) => {
        if (a.posicion < b.posicion) {
            return -1;
        }
        if (a.posicion > b.posicion) {
            return 1;
        }
        return 0;
    });

    var res = posiciones.slice(0, 10);
    return res;
}


module.exports = {
    imprimir,
    Redondear,
    rutRep,
    opcionA,
    opcionB,
    opcionC
}