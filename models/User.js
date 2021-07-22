const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    nome: {type: String, required: true, minlength: 3, maxlenght: 50},
    email: {type: String, required: true, minlength: 5, maxlenght: 100},
    senha: {type: String, required: true, minlength: 6, maxlenght: 100},
    admin: {type: Boolean, default: false},
    data: {type: Date, default: Date.now }
})

module.exports = mongoose.model("User", userSchema);