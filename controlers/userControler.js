const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validate = require("./validate")

const userControler = {
    register: async function (req, res) {

        const result_validacao = validate.registerValidate(req.body);

        const {error} = result_validacao;

        if (error) {
            return res.status(400).send(error.message)
        } else {
            try {
                const email_existente = await User.findOne({ email: req.body.email })

                if (email_existente) {
                    return res.send("Email ja existe")
                } else {

                    const user = new User({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: bcrypt.hashSync(req.body.senha)
                    })
                    user.save().then(doc => {
                        res.send("Usuario registrado")
                    }).catch(err => {
                        res.status(400).send(err)
                    })
                }
            } catch (err) {
                res.send("Erro no registro: " + err.message)
            }
        }
    },

    login: async function (req, res) {

        const { error } = validate.loginValidate(req.body);
        if (error) {
            return res.status(400).send(error.message)
        } else {
            try {
                const email_existente = await User.findOne({ email: req.body.email })

                if (!email_existente) {
                    return res.send("Email ou senha incorreto")
                }

                const match = bcrypt.compareSync(req.body.senha, email_existente.senha);

                if (!match) {
                    return res.send("Email ou senha incorreto")
                } else {

                    const token = jwt.sign({ id: email_existente.id }, process.env.SECRET, { expiresIn: 43200 })

                    res.header("chave_de_autorizacao", token)
                    res.send("Usuário logado")
                }

            } catch (err) {
                res.send("O erro foi no catch do login:" + err.message)
            }
        }
    },
}

module.exports = userControler;
