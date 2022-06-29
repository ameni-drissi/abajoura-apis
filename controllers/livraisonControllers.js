const express = require("express")
const Livraison = require("./../models/livraison")

const Message = require('./../models/livraison')

const app = express()

app.post('/', async (req, res) => {
    try {
        let data = req.body
        let livraison = new Livraison({

            pays: data.pays,
            prenom:data.prenom,
            nom: data.nom,
            adresse: data.adresse,
            appartement: data.appartement,
            ville: data.ville,
            codePostale: data.codePostale,
            phone: data.phone,
        })
      
        await livraison.save()
        res.status(201).send({ message: "Shipping adress saved !" })

    } catch (error) {
        res.status(400).send({ message: "Shipping adress faild !" })
    }
})


app.get('/', async (req, res) => {
    try {
        let livraison = await Livraison.find()
        res.status(200).send(livraison)
    } catch (error) {
        res.status(400).send({ message: "Error fetching Shipping adress !", error: error })
    }
})

app.get('/:id', async (req, res) => {
    try {
        let livraisonId = req.params.id

        let livraison = await Livraison.findOne({ _id: livraisonId })

        if (livraison)
            res.status(200).send(livraison)
        else
            res.status(404).send({ message: "Shipping adress not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error fetching Shipping adress !", error: error })
    }
})

app.patch('/:id', async (req, res) => {
    try {
        let livraisonId = req.params.id
        let data = req.body

        let livraison = await Livraison.findOneAndUpdate({ _id: livraisonId }, data)

        if (livraison)
            res.status(200).send({ message: "Shipping adress updated !" })
        else
            res.status(404).send({ message: "Shipping adress not found !" })

    } catch (error) {
        res.status(400).send({ message: "Error updating Shipping adress !", error: error })
    }

})

app.delete('/:id', async (req, res) => {
    try {
        let livraisonId = req.params.id

        let livraison = await messages.findOneAndDelete({ _id: livraisonId })
      
        if (livraison)
            res.status(200).send({ message: "Shipping adress deleted !" })
            
        else
            res.status(404).send({ message: "Shipping adress not found !" })
         

    } catch (error) {
        res.status(400).send({ message: "Error deleting Shipping adress !", error: error })
    }
})

module.exports = app