// ====================================================================================
// @param Una cadena 
// @return Una cadena sin tíldes
// ====================================================================================
const removerTildes = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

// ====================================================================================
// @param Array que contiene objetos con la información de todas las carreras
// @param Código de carrera enviado como query param en la petición
// @return Objeto con la información de la carrera asociada al código
// ====================================================================================
const getInfoCarrera = (carrerasJson, codigoCarrera) => {

    // Retorna el indice en donde se encuentra la información de la carrera asociada al codigo de carrera. Si no lo encuentra, retorna -1
    let i = carrerasJson.map((e) => { return e.codigo; }).indexOf(parseInt(codigoCarrera));
    // let i = carrerasJson.map((e) => e.codigo).indexOf(parseInt(codigoCarrera));

    // Si se encontró una coincidencia con el código ingresado como query param, retorna la información asociada a dicho este
    if (i !== -1) {

        return {
            nombreCarrera: carrerasJson[i].nombreCarrera,
            codigoCarrera: carrerasJson[i].codigo,
            Nem: carrerasJson[i].nem,
            Ranking: carrerasJson[i].ranking,
            Lenguaje: carrerasJson[i].lenguaje,
            Matematica: carrerasJson[i].matematica,
            HistoriaOCiencias: carrerasJson[i].cienciasHistoria,
            PuntajePromedio: (carrerasJson[i].primero + carrerasJson[i].ultimo) / 2,
            MinimoPostulacion: "No tiene",
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

// ====================================================================================
// @param Array que contiene objetos con la información de todas las carreras
// @param Objeto con los nombres de las carreras enviadas por query param en la petición
// @return Array de objetos con la información de las carreras
// ====================================================================================
const getInfoCarreras = (carrerasJson, nombresCarreras) => {

    let carreras = [];
    // Recorre el objeto que contiene los nombres de las carreras ingresadas como query param
    for (let prop in nombresCarreras) {
        // Se inicializa una expresión regular
        // El constructor de la clase RegExp recibe como primer parametro el término o patrón de la expresión
        // y como segundo parametro recibe el flag, el cual para este caso es 'i' lo que indica que la expresión será insensible a mayúsculas y minpusculas
        let regex = new RegExp(removerTildes(nombresCarreras[prop]), 'i');

        // Recorre el array que contiene objetos con la información de las carreras
        carrerasJson.forEach((carrera) => {

            // Si existe una coincidencia entre el nombre de una carrera y la expresión regular 
            if (regex.test(removerTildes(carrera.nombreCarrera))) {
                // Agrega un objeto al array 'carreras'
                carreras.push({
                    nombreCarrera: carrera.nombreCarrera,
                    codigoCarrera: carrera.codigo,
                    Nem: carrera.nem,
                    Ranking: carrera.ranking,
                    Lenguaje: carrera.lenguaje,
                    Matematica: carrera.matematica,
                    HistoriaOCiencias: carrera.cienciasHistoria,
                    PuntajePromedio: (carrera.primero + carrera.ultimo) / 2,
                    MinimoPostulacion: "No tiene",
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

// ====================================================================================
// @param Puntaje ponderado de una carrera
// @param Objeto con información de una carrera
// @return Lugar tentativo en la carrera 
// ====================================================================================
const lugarTentativo = (puntaje, carrera, valorPorLugar) => {

    // Si el ptje ponderado es mayor al del primer matriculado, el lugar tentativo sería el primero
    if (puntaje >= carrera.primero) {
        return 1;
    } else { // Si no
        // Calcula el lugar tentativo
        let resultado = (carrera.primero - puntaje) / valorPorLugar;

        // Si la aproximacion del lugrr tentativo es igual a cero, este también sería el primero 
        if (Math.round(resultado) === 0) {
            return 1;
        } else { // Si no, retorna el lugar tentativo correspondiente
            return Math.round(resultado);
        }
    }
}

// ====================================================================================
// @param Objeto que contiene los puntajes enviados como query param a la petición
// @param Objeto que contiene la información de una carrera en específico
// @return Objeto que contiene el código, nombre, ptje de postulación y el lugar tentativo en la carrera
// ====================================================================================
const calcularPtje = (puntajes, carrera) => {
    // Se calculan los puntajes según el porcentaje que tienen en una carrera determinada
    let nem = parseInt(puntajes.Nem) * (carrera.nem / 100),
        rank = parseInt(puntajes.Ranking) * (carrera.ranking / 100),
        mate = parseInt(puntajes.Matematica) * (carrera.matematica / 100),
        leng = parseInt(puntajes.Lenguaje) * (carrera.lenguaje / 100),
        hist = parseInt(puntajes.Historia) * (carrera.cienciasHistoria / 100),
        cien = parseInt(puntajes.Ciencias) * (carrera.cienciasHistoria / 100);

    let mayorHistCien = 0;
    // Si el ptje de historia es mayor que ciencias, se utiliza el ptje de historia
    if (hist > cien) {
        mayorHistCien = hist;
    } else { // Si no, se utiliza el ptje de ciencias
        mayorHistCien = cien;
    }
    // Se calcula el ptje total
    let resultado = nem + rank + mate + leng + mayorHistCien;
    // Retorna toda la información correspondiente
    return {
        codigo: carrera.codigo,
        nombre: carrera.nombreCarrera,
        puntaje_postulacion: parseFloat(resultado.toFixed(2)),
        lugar_tentativo: lugarTentativo(resultado, carrera, (carrera.primero + carrera.ultimo) / carrera.vacantes)
    }
}

// ====================================================================================
// @param Objeto que contiene los puntajes enviados como query param a la petición
// @param Array de objetos que contienen la información de cada una de las carreras
// @return Array con las 10 carreras en las que se tienen mayores opciones de ingresar
// ====================================================================================
const getCarrerasTop = (carreras, puntajes) => {

    // Arreglo que contendrá las postulaciones en todas las carreras
    let arregloPtjes = [];

    // Se recorre el arreglo que contiene todas las carreras
    carreras.forEach(element => {
        let ponderado = calcularPtje(puntajes, element);
        // Si el ptje ponderado es mayor que el ptje del ultimo matriculado, se añade dicho este al arreglo inicializado al comienzo
        if (ponderado.puntaje_postulacion >= element.ultimo) {
            if (((parseInt(puntajes.Matematica) + parseInt(puntajes.Lenguaje)) / 2) >= 450) {
                arregloPtjes.push(calcularPtje(puntajes, element));
            }
        }
    });

    // Ordena el array de objetos en base al puntaje
    arregloPtjes.sort((a, b) => {

        if (a.puntaje_postulacion < b.puntaje_postulacion) {
            return 1;
        }
        if (a.puntaje_postulacion > b.puntaje_postulacion) {
            return -1;
        }

        return 0;
    });

    // Ordena el array de objetos en base al lugar tentativo
    arregloPtjes.sort((a, b) => {

        if (a.lugar_tentativo < b.lugar_tentativo) {
            return -1;
        }
        if (a.lugar_tentativo > b.lugar_tentativo) {
            return 1;
        }

        return 0;
    });

    // Retorna las 10 mejores opciones
    return arregloPtjes.slice(0, 10);
}

module.exports = {
    getInfoCarrera,
    getInfoCarreras,
    getCarrerasTop
}