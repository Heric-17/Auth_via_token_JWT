const express = require("express");
const router = express.Router();
const auth = require("../controlers/authControler")

router.get("/", auth, (req, res) => {
    if (req.user.admin) {
        res.send("Esse dado so poder ser visto pelo adm")
    } else {
        return res.status(401).send("Apenas administradores podem acessar essa pagina!")
    }
})

router.get("/log", auth, (req, res) => {
    res.send("Apenas logados enxergam esse dado")
})

module.exports = router;