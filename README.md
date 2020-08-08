# Proyecto API REST Computacion Paralela y Distribuida

## Informacion

API REST desarrollada para la asignatura de computación paralela y distribuida - UTEM.

## Requerimientos

Para el correcto funcionamiento, se requieren las siguientes tecnologías:

- [Node JS](https://nodejs.org/es/download/) (Versión utilizada: v12.16.3) ![a building](https://image.flaticon.com/icons/svg/919/919825.svg)
- [MongoDB](https://www.mongodb.com/try/download/community) (Versión utilizada: v4.2.7)

## Uso

1) Clonar el repositorio en un directorio con **```git clone https://github.com/YerkoFC/proyecto-rest-CDP.git```**.
2) Ubicado en dicho directorio, debe ejecutar **```npm install```** para la instalación de todos los módulos necesarios.
3) Ejecutar **```node src/database/insertDocuments.js```** para insertar desde un archivo .json a una colección en mongo toda la información correspondiente a los requisitos de postulación de cada carrera en la UTEM.
4) Una vez realizado lo anterior, debe ejecutar **```npm run start```** para ejecutar la aplicación.

## Test

Para el testing de la aplicación se pueden utilizar alguna de las siguientes herramientas:

- [Postman](https://www.postman.com/downloads/) (Usado para los ejemplos)
- [Insomnia](https://insomnia.rest/download/)
- [SoapUI](https://www.soapui.org/downloads/soapui/)

## endpoints

-  **[POST] _/api/users/signup_**

    **Request body:** application/x-www-form-urlencoded
    
    **Ejemplo:**
    
    ``` 
        KEY           VALUE
        username:     user-name-test  
        useremail:    user-email-test@gmail.com
        userpassword: 123456
    ```
    **Las KEYS establecidas deben tener si o si los nombres del ejemplo!**
    
    **Respuestas:**
    
    - Código: 200
      - Descripción: Signup correcto
      - Ejemplo: 
      
      ```
      {
          "ok": true,
          "userDB": {
              "_id": "5f1616c43bcef223280d819c",
              "username": user-name-test  ",
              "email": "user-email-test@gmail.com",
              "__v": 0
          }
      }
      ```
    - Código: 400
        - Descripción: Error en la petición
        - Ejemplo: 
        ```
      {
          "ok": false,
          "err": {
              "message": "Hay datos faltantes en el body de la petición",
          }
      }
      ```

- **[POST] _/api/users/signin_**

    **Request body:** application/x-www-form-urlencoded
    
     **Ejemplo:**
    
    ``` 
        KEY           VALUE 
        useremail:    user-email-test@gmail.com
        userpassword: 123456
    ```

    **Respuestas:**
    
    - Código: 200
      - Descripción: Signin correcto
      - Ejemplo: 
      
      ```
      {
        "ok": true,
        "usuario": {
            "_id": "5f1546cd22c97b0017fc87ad",
            "username": "user-name-test",
            "email": "user-email-test@gmail.com",
            "__v": 0
        },
        "token":    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjVmMTU0NmNkMjJjOTdiMDAxN2ZjODdhZCIsInVzZXJuYW1lIjoiWWVya28gRm9uY2VhIENhc3RybyIsImVtYWlsIjoieWVya29mb25jZWEuOTdAZ21haWwuY29tIiwiX192IjowfSwiaWF0IjoxNTk1MzAyMDQ4LCJleHAiOjE1OTUzMDQ2NDB9.gCjwXGN6OYLL-keatkUN3ie5msNJu3TssJHNGfHvJGo"
      }
      ```
    - Código: 401
        - Descripción: Error en la petición
        - Ejemplo: 
        ```
      {
          "ok": false,
          "err": {
              "message": "Usuario o contraseña incorrectos",
          }
      }
      ```
- **[GET] _/api/careers/code_**

    **Query params:** 
    ``` 
        KEY      VALUE
        cod:     21041
    ```
    **Headers:** 
    ``` 
        KEY        VALUE
        token:     your-token
    ```
    **Las KEYS establecidas deben tener si o si los nombres del ejemplo!**

    **Respuestas:**
    
    - Código: 200
      - Descripción: Información de la carrera
      - Ejemplo: 
      
      ```
      {
          "ok": true,
          "career": {
              "_id": "5f15425913fe850d58c14d8d",
              "carrera": "Ingeniería Civil en Computación, mención Informática",
              "codigo": 21041,
              "nem": 10,
              "ranking": 25,
              "matematica": 35,
              "lenguaje": 20,
              "histcien": 10,
              "minimoPond": 0,
              "vacantes": 130,
              "primero": 673.65,
              "ultimo": 539.35,
              "__v": 0
          }
      }
      ```
    - Código: 400
        - Descripción: Error en la petición
        - Ejemplo: 
        ```
        {
            "ok": false,
            "err": {
                "message": "Código de carrera requerido como query param"
            }
        }
        ```
        
     - Código: 401
        - Descripción: No autorizado
        - Ejemplo: 
        ```
        {
            "ok": false,
            "err": {
                "message": "Token no válido"
            }
        }
        ```
        
    - Código: 404
        - Descripción: Recurso no encontrado
        - Ejemplo: 
        ```
        {
            "ok": false,
            "err": {
                "message": "No existe carrera asociada al código recibido como query param"
            }
        }
        ```
- **[GET] _/api/careers/name_**
    
    **Query params:** 
    ``` 
        KEY          VALUE
        career1:     Dibujante Proyectista
        career2:     Ingeniería Civil en Computación, mención Informática
    ```
    **Headers:** 
    ``` 
        KEY        VALUE
        token:     your-token
    ```
    **Respuestas:**
    
    - Código: 200
      - Descripción: Información de la carrera
      - Ejemplo: 
      
      ```
      {
          "ok": true,
          "careers": [
              {
                  "_id": "5f15425913fe850d58c14d8d",
                  "carrera": "Ingeniería Civil en Computación, mención Informática",
                  "codigo": 21041,
                  "nem": 10,
                  "ranking": 25,
                  "matematica": 35,
                  "lenguaje": 20,
                  "histcien": 10,
                  "minimoPond": 0,
                  "vacantes": 130,
                  "primero": 673.65,
                  "ultimo": 539.35,
                  "__v": 0
              },
              {
                  "_id": "5f15425913fe850d58c14d94",
                  "carrera": "Dibujante Proyectista",
                  "codigo": 21071,
                  "nem": 10,
                  "ranking": 25,
                  "matematica": 35,
                  "lenguaje": 20,
                  "histcien": 10,
                  "minimoPond": 0,
                  "vacantes": 25,
                  "primero": 689.85,
                  "ultimo": 496.45,
                  "__v": 0
              }
          ]
      }
      ```
      
     - Código: 401
        - Descripción: No autorizado
        - Ejemplo: 
        ```
        {
            "ok": false,
            "err": {
                "message": "Token no válido"
            }
        }
        ```      
        
    - Código: 404
      - Descripción: Recurso no encontrado
      - Ejemplo: 
      ```
      {
          "ok": false,
          "err": {
            "message": "Las carreras ingresadas no tienen alguna información asociada en la base de datos"
          }
      }
      ```
          
- **[POST] _/api/careers/scores_**

    **Request body:** application/x-www-form-urlencoded
    **Headers:** 
    ``` 
        KEY        VALUE
        token:     your-token
    ```
    **Ejemplo:**
    
    ``` 
        KEY             VALUE
        nem:            500
        ranking:        850
        matematicas:    450
        lenguaje:       850
        ciencias:       369
        historia:       600
    ```
    **Las KEYS establecidas deben tener si o si los nombres del ejemplo!**

   **Respuestas:**
   - Código: 200
      - Descripción: Información de las 10 carreras con mayor posibilidad de postular
      - Ejemplo: 
      ```
         {
             "ok": true,
             "data": [
                 {
                     "careerCode": 21002,
                     "careerName": "Bibliotecología y Documentación",
                     "postulationScore": 715,
                     "place": 1
                 },
                 {
                     "careerCode": 21012,
                     "careerName": "Contador Público y Auditor",
                     "postulationScore": 682.5,
                     "place": 1
                 }, ...
             ]
         }
     ```


      
   - Código: 400
      - Descripción: Error en la petición
      - Ejemplo: 
      ```
      {
          "ok": false,
          "err": {
              "message": "Hay datos faltantes en el body de la petición"
          }
      }
      ```      
      
      
            
   - Código: 401
      - Descripción: No autorizado
      - Ejemplo: 
      ```
      {
          "ok": false,
          "err": {
              "message": "Token no válido"
          }
      }
      ```      
    
