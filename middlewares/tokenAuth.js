// ==========================
// jsonwebtoken
// ==========================
const jwt = require('jsonwebtoken');

/*
    Middleware que verifica si un tóken es válido o no, en caso de que lo sea,
    se permite el acceso a un servicio de la api, por el contrario, en caso de 
    que no, envía una respuesta en un formato json indicando el error.
*/

let verificaToken = (req, res, next) => {

    // Obtiene el token del header de la peticion
    let token = req.get('token');

    // Método del módulo jsonwebtoken que verifica si el token enviado por parametro es válido o no
    jwt.verify(token, process.env.SEED_JWT, (err, decoded) => {

        // En caso de se lanze un error, se envía una respuesta con un código de estado 401
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    mensaje: 'Token no válido'
                }
            });
        }

        // En caso de que no ocurra un error se permite el acceso al servicio de la api pasando el control a la función siguiente
        next();
    });
}


module.exports = {
    verificaToken
};