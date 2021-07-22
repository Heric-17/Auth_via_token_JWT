const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("chave_de_autorizacao");
    if (!token) {
        return res.status(401).send("Acesso negado!")
    } else {
        try {
            const usuarioVerificado = jwt.verify(token, process.env.SECRET)
            req.user = usuarioVerificado;
            next()
        } catch (err) {
            return res.status(401).send("Acesso negado!")
        }
    }
}