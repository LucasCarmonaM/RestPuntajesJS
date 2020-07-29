// Función que elimina los acentos de un string y lo retorna completamente en minúsculas
const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Función que busca la información de una carrera por su código
const opcionA = (carrerasJson, codigoCarrera) => {

    // Retorna el indice en donde se encuentra la información de la carrera asociada al codigo de carrera
    // Si no lo encuentra, retorna -1
    let i = carrerasJson.map(function (e) { return e.codigo; }).indexOf(parseInt(codigoCarrera));

    if (i != -1) {
        return {
            nombreCarrera: carrerasJson[i].nombreCarrera,
            codigoCarrera: carrerasJson[i].codigo,
            Nem: carrerasJson[i].nem,
            Ranking: carrerasJson[i].ranking,
            Lenguaje: carrerasJson[i].lenguaje,
            Matematica: carrerasJson[i].matematica,
            HistoriaOCiencias: carrerasJson[i].cienciasHistoria,
            PuntajePromedio: (carrerasJson[i].primero + carrerasJson[i].ultimo) / 2,
            MinimoPostulacion: 0,
            PromLenMat: 450,
            MinPonderado: 450,
            Vacantes: carrerasJson[i].vacantes,
            PrimerMatri: carrerasJson[i].primero,
            UltimoMatri: carrerasJson[i].ultimo
        };
    } else {
        return {};
    }
}

const opcionB = (carrerasJson, NombreCarrera) => {
    let carreras = [];
    for (let prop in NombreCarrera) {
        carrerasJson.forEach((carrera) => {
            if (removeAccents(carrera.nombreCarrera) == removeAccents(NombreCarrera[prop])) {
                carreras.push({
                    nombreCarrera: carrera.nombreCarrera,
                    codigoCarrera: carrera.codigo,
                    Nem: carrera.nem,
                    Ranking: carrera.ranking,
                    Lenguaje: carrera.lenguaje,
                    Matematica: carrera.matematica,
                    HistoriaOCiencias: carrera.cienciasHistoria,
                    PuntajePromedio: (carrera.primero + carrera.ultimo) / 2,
                    MinimoPostulacion: 0,
                    PromLenMat: 450,
                    MinPonderado: 450,
                    Vacantes: carrera.vacantes,
                    PrimerMatri: carrera.primero,
                    UltimoMatri: carrera.ultimo
                });
            }
        });
    }
    return carreras;
}

const placeTentative = (score, career) => {

    let placeValue = (career.primero - career.ultimo) / career.vacantes;

    if (score >= career.primero) {
        return 1;
    } else {

        let result = (career.primero - score) / placeValue;

        if (Math.round(result) === 0) {
            return 1;
        } else {
            return Math.round(result);
        }
    }
}

const calculateScore = (scores, career) => {

    let nem = parseInt(scores.Nem) * (career.nem / 100),
        rank = parseInt(scores.Ranking) * (career.ranking / 100),
        mate = parseInt(scores.Matematica) * (career.matematica / 100),
        leng = parseInt(scores.Lenguaje) * (career.lenguaje / 100),
        hist = parseInt(scores.Historia) * (career.cienciasHistoria / 100),
        cien = parseInt(scores.Ciencias) * (career.cienciasHistoria / 100);

    let mayorHistCien = 0;

    if(hist > cien) {
        mayorHistCien = hist;
    } else {
        mayorHistCien = cien;
    }   
    

    let result = nem + rank + mate + leng + mayorHistCien;
    return {
        codigo: career.codigo,
        nombre: career.nombreCarrera,
        puntaje_postulacion: result,
        lugar_tentativo: placeTentative(result, career)
    }
}


const opcionC = (scores, careers) => {

    let scoresArray = [];

    careers.forEach(element => {
        if( calculateScore(scores, element).puntaje_postulacion >= element.ultimo ){
            scoresArray.push(calculateScore(scores, element));
        }

    });

    scoresArray.sort((a, b) => {

        if (a.lugar_tentativo < b.lugar_tentativo) {
            return -1;
        }
        if (a.lugar_tentativo > b.lugar_tentativo) {
            return 1;
        }

        return 0;
    });

    return scoresArray.slice(0, 10);
}


module.exports = {
    opcionA,
    opcionB,
    opcionC
}