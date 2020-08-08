# Proyecto API REST Computacion Paralela y Distribuida

  

## Informacion

  

API REST desarrollada para la asignatura de computación paralela y distribuida - UTEM.

  

## Requerimientos

  

Para el correcto funcionamiento, se requieren las siguientes tecnologías:

  

-  [Node JS](https://nodejs.org/es/download/)

  

En el caso de utilizar Ubuntu se deben instalar con los siguientes comandos:

  

#### Node JS

- Primero comprobaremos si esta instalado con los siguientes comandos en la terminal:

```
$ nodejs -v
$ nodejs
```

- En caso de no devolvernos la version, procedemos a instalarlo de la siguiente manera

```
$ sudo apt-get update
$ sudo apt-get install node
$ sudo apt-get install nodejs
```

- Volvemos al primer paso para comprobar que se instalo de manera correcta.

```
$ nodejs -v
$ nodejs
```

#### Instalar NPM (Node Package Manager)

```
$ sudo apt-get install npm
```

  

## Uso

  

1) Clonar el repositorio en un directorio con **```git clone https://github.com/LucasCarmonaM/RestPuntajesJS.git```**.

2) Ubicado en dicho directorio, debe ejecutar **```$ npm install```** para la instalación de todos los módulos necesarios.

3) Una vez realizado lo anterior, debe ejecutar **```$ npm run start```** para ejecutar la aplicación (Servidor).

  

## Test

  
Para el testing de la aplicación se pueden utilizar alguna de las siguientes herramientas:

-  [Postman](https://www.postman.com/downloads/) (Usado para los ejemplos)  

## Endpoints

## - [POST]  _/api/autenticacion_


**Request body:** application/x-www-form-urlencoded  

**Usuario existente:**  

```

KEY:VALUE

usuario: Admin

password: 1234

```

**Respuestas:**

#### Caso exitoso:

- Código: 200

- Descripción: Autenticacion correcta

- Ejemplo:

```javascript

{

	"ok": true,

	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjoiQWRtaW4iLCJpYXQiOjE1OTY5MjI3MzgsImV4cCI6MTU5NjkyNTMzMH0.qJJXpHltvCpGy5cm5i-MpDux8wBVJlrY6B1GxaovPuE"

}
```
#### Caso fallido:

- Código: 401

- Descripción: Usuario no autorizado

- Ejemplo:

```javascript

{

	"ok": false,

	"err": {

		"mensaje": "No existe usuario asociado a las credenciales ingresadas"

	}

}

```

## - [GET]  _/api/carreras/codigo_

  

**Query params:**  

```

KEY:VALUE

cod: 21041

```

**Headers:**

```

KEY:VALUE

token: your-token

```

**Las `KEYS` establecidas deben tener si o si los nombres del ejemplo!**

  

**Respuestas:**

#### Caso exitoso:

- Código: 200

- Descripción: Información de la carrera

- Ejemplo:

```javascript

{
	"ok": true,
	"carrera": {
		"nombreCarrera": "Ingeniería Civil en Computación, mención 				Informática",
		"codigoCarrera": 21041,
		"Nem": 10,
		"Ranking": 25,
		"Lenguaje": 20,
		"Matematica": 35,
		"HistoriaOCiencias": 10,
		"PuntajePromedio": 606.5,
		"MinimoPostulacion": "No tiene",
		"PromLenMat": 450,
		"MinPonderado": 450,
		"Vacantes": 130,
		"PrimerMatri": 673.65,
		"UltimoMatri": 539.35
	}
}

```
#### Caso fallido:

- Código: 400

- Descripción: No se ingresaron parametros en la url

- Ejemplo:

```javascript
{

	"ok": false,

	"err": {

		"mensaje": "Se debe ingresar un parametro válido"

	}

}
```
#### Caso fallido:

- Código: 401

- Descripción: No autorizado

- Ejemplo:

```javascript
{
	"ok": false,

	"err": {

		"mensaje": "Token no válido"

	}
}
```
#### Caso fallido:

- Código: 404

- Descripción: No se pudo encontrar informacion solicitada

- Ejemplo:

```javascript
{

	"ok": false,

	"err": {

		"mensaje": "No se ha encontrado una carrera asociada con el código 210411"

	}

}
```
## -[GET]  _/api/carreras/nombre_

**Query params:**

```

KEY:VALUE

nombre: Administracion

```

**Headers:**

```

KEY:VALUE

token: your-token

```

**Respuestas:**

#### Caso exitoso:

- Código: 200

- Descripción: Información de la carrera

- Ejemplo:

```javascript

{
	"ok": true,
	"carreras": [
		{
			"nombreCarrera": "Ingeniería en Administración Agroindustrial",
			"codigoCarrera": 21015,
			"Nem": 10,
			"Ranking": 20,
			"Lenguaje": 30,
			"Matematica": 30,
			"HistoriaOCiencias": 10,
			"PuntajePromedio": 545.3,
			"MinimoPostulacion": "No tiene",
			"PromLenMat": 450,
			"MinPonderado": 450,
			"Vacantes": 30,
			"PrimerMatri": 628.8,
			"UltimoMatri": 461.8
		},
		{
			"nombreCarrera": "Administración Pública",
			"codigoCarrera": 21089,
			"Nem": 15,
			"Ranking": 20,
			"Lenguaje": 30,
			"Matematica": 25,
			"HistoriaOCiencias": 10,
			"PuntajePromedio": 569.4,
			"MinimoPostulacion": "No tiene",
			"PromLenMat": 450,
			"MinPonderado": 450,
			"Vacantes": 35,
			"PrimerMatri": 625.8,
			"UltimoMatri": 513
		}
	]
}

```

#### Caso fallido:

- Código: 401

- Descripción: No autorizado

- Ejemplo:

```javascript

{
	"ok": false,
	"err": {
		"mensaje": "Token no válido"
	}
}

```
#### Caso fallido:

- Código: 404

- Descripción: Recurso no encontrado

- Ejemplo:

```javascript

{
	"ok": false,
	"err": {
		"mensaje": "No se encontró información asociada a los datos ingresados"
	}
}

```

## -[POST]  _/api/carreras/puntajes_

  

**Request body:** application/x-www-form-urlencoded


```

KEY:VALUE

Nem: 500

Ranking: 850

Matematicas: 450

Lenguaje: 850

Ciencias: 380

Historia: 600

```



**Headers:**

```

KEY:VALUE

token: your-token

```

**Las KEYS establecidas deben tener si o si los nombres del ejemplo!**

  

**Respuestas:**

#### Caso exitoso:

- Código: 200

- Descripción: Información de las 10 carreras con mejor posibilidad de postular

- Ejemplo:

```javascript
{
	"ok":  true,
	"carreras":  [
		{
			"codigo":  21082,
			"nombre":  "Ingeniería en Gestión Turística",
			"puntaje_postulacion":  507,
			"lugar_tentativo":  18
		},
		{
			"codigo":  21015,
			"nombre":  "Ingeniería en Administración Agroindustrial",
			"puntaje_postulacion":  507,
			"lugar_tentativo":  22
		},
		{
			"codigo":  21087,
			"nombre":  "Ineniería Civil en Prevención de Riesgos y Medioambiente",
			"puntaje_postulacion":  506,
			"lugar_tentativo":  22
		},
		{
			"codigo":  21046,
			"nombre":  "Bachillerato en Ciencias de la Ingeniería",
			"puntaje_postulacion":  507,
			"lugar_tentativo":  24
		},
		{
			"codigo":  21071,
			"nombre":  "Dibujante Proyectista",
			"puntaje_postulacion":  507,
			"lugar_tentativo":  24
		},
		{
			"codigo":  21039,
			"nombre":  "Ingeniería en Industria Alimentaria",
			"puntaje_postulacion":  506,
			"lugar_tentativo":  24
		},
		{
			"codigo":  21083,
			"nombre":  "Química Industrial",
			"puntaje_postulacion":  516,
			"lugar_tentativo":  26
		},
		{
			"codigo":  21002,
			"nombre":  "Bibliotecología y Documentación",
			"puntaje_postulacion":  505,
			"lugar_tentativo":  27
		},
		{
			"codigo":  21023,
			"nombre":  "Diseño Industrial",
			"puntaje_postulacion":  507,
			"lugar_tentativo":  43
		},
		{
			"codigo":  21045,
			"nombre":  "Ingeniería Industrial",
			"puntaje_postulacion":  507,
			"lugar_tentativo":  43
		}
	]
}
```
#### Caso fallido:

- Código: 400

- Descripción: Error en la peticion

- Ejemplo:

```javascript

{
	"ok":  false,
	"err":  {
		"mensaje":  "Parametros requeridos en el body"
	}
}

```
#### Caso fallido:

- Código: 401

- Descripción: No autorizado

- Ejemplo:

```javascript

{
	"ok":  false,
	"err":  {
		"mensaje":  "Token no válido"
	}
}

```