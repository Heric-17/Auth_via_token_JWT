require("dotenv").config();
const cors = require("cors")
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const admRoutes = require("./routes/admRoute");
app.set(cors())

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true },
    (err, db) => { if (err) { console.log(err) } else { console.log("Banco carregado") } })

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/user", userRoutes)
app.use("/admin", admRoutes)

const PORTA = 5000;

app.listen(PORTA, () => {
    console.log("Running on port:", PORTA);
})

