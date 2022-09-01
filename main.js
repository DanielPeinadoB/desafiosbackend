const express = require("express");
const db = require("./db.js");
const app = express();

//app.use(express.urlencoded());
app.use(express.json());

const DB = new db('productos.txt');

app.get("/", (req, res) => {
    res.send("Daniel Peinado")
})

app.get("/productos", async (req, res) => {
    const data = await DB.getAll();
    console.log(data)
    return res.send(data)
    //envia data pero no ordenada
})

app.get("/productoRandom", async (req, res) => {
    const data = await DB.getRandom();
    console.log(data)
    return res.send(data)
})


app.listen(8080, () => {
    console.log("Iniciado");
  });  