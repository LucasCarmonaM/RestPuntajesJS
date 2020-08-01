/* JSONWEBTOKEN */
const jwt = require('jsonwebtoken');

let verificaToken = (req, res, next) => {

    // Obtiene el token del header de la peticion
    let token = req.get('token');
    // Funcion que verifica el token
    jwt.verify(token, process.env.SEED_JWT, (err, decoded) => {
        // Si el token esta mal o si ya expiró, muestra el error
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    mensaje: 'Token no válido'
                }
            });
        }
        next();
    });
}


module.exports = {
    verificaToken
};