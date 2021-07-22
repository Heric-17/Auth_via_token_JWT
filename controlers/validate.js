const joi = require("@hapi/joi");

module.exports = {
    registerValidate: (data) => {
        const schema = joi.object({
            nome: joi.string().required().min(3).max(50),
            email: joi.string().required().min(5).max(50),
            senha: joi.string().required().min(6).max(50),
        })
        return schema.validate(data);
    },

    loginValidate: (data) => {
        const schema = joi.object({
            email: joi.string().required().min(5).max(50),
            senha: joi.string().required().min(6).max(50),
        })
        return schema.validate(data);
    }
}