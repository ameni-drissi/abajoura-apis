const mongoose = require("mongoose")

const livraisonSchema = new mongoose.Schema({
    pays: {
        type: String,
        required: true,
    },
    prenom: {
        type: String,
        required: true,
    },

    nom: {
        type: String,
        required: true
    },

    adresse: {
        type: String,
        required: true
    },

    appartement: {
        type: String,
        required: true
    },

    ville: {
        type: String,
        required: true
    },

    codePostale: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

})

const Livraison = mongoose.model("livraison", livraisonSchema)

module.exports = Livraison