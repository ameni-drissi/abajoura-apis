const express = require("express")
const cors = require("cors")

const mongoose = require("./config/db");

// import controllers
const usersController = require("./controllers/usersController")
const productsController = require("./controllers/productsController")
const livraisonController = require("./controllers/livraisonControllers")
const cartsController = require("./controllers/cartsController")
// creation d'un objet express 
const app = express()
const port = 5500

// autorisé l'accee d'un serveur
app.use(cors())

// autorisé les données de type JSON
app.use(express.json())

// autorisé les données de type files
app.use(express.urlencoded({
    extended: true
}));

// access to public files
app.use(express.static('./assets/images'));
app.use(express.static('./assets/images/products'));

// router
app.use("/users", usersController)
app.use("/products", productsController)
app.use("/livraison", livraisonController)
app.use("/carts", cartsController)

app.listen(port, () => {console.log(`🟢 Server started on port ${port}`);})