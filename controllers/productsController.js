const express = require("express")

const Product = require("./../models/product");

const multer = require('multer')

const path = require('path');
const fs = require("fs");

const app = express();

const storage = multer.diskStorage({
  destination: "./assets/images/products",

  filename: function (req, file, cb) {
    let title = req.body.title.replace(" ", "").toLowerCase();

    cb(null, title + "-" + Date.now() + path.extname(file.originalname));
  },
});


function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  const mimetype = filetypes.test(file.mimetype);

  if (mimetype == true && extname == true) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}


const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});



app.post('/', [upload.single("picture")],async (req, res) => {
  try {
    let data = req.body;
    let file = req.file;

    let product = new Product({
      title: data.title,
      description: data.description,
      prix: data.prix,
      category: data.category,
      image: file.filename,
    })

    await product.save()

    res.status(201).send({ message: "Product saved !" })
  } catch (error) {
    res.status(400).send({ message: "Product not saved !", error: error })
  }

})

app.get('/', async (req, res) => {
  try {
    let products = await Product.find()
    res.status(200).send(products)
  } catch (error) {
    res.status(400).send({ message: "Error fetching trainings !", error: error })
  }
})

app.get('/:id', async (req, res) => {
  try {
    let productId = req.params.id

    let product = await Product.findOne({ _id: productId })

    if (product)
      res.status(200).send(product)
    else
      res.status(404).send({ message: "Product not found !" })

  } catch (error) {
    res.status(400).send({ message: "Error fetching product !", error: error })
  }
})

app.patch("/:id", [upload.single("picture")], async (req, res) => {
  try {
    let productId = req.params.id;
    let data = req.body;

    if (req.file) {
      data.image = req.file.filename;
      let product = await Product.findOne({ _id: productId });
      fs.unlinkSync("assets/images/products/" + product.image);
    }

    let updatedProduct = await Product.findOneAndUpdate(
      { _id: productId },
      data
    );

    if (updatedProduct)
      res.status(200).send({ message: "Product updated !" });
    else res.status(404).send({ message: "Product not found !" });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error updating product !", error: error });
  }
});

app.delete('/:id', async (req, res) => {
  try {
    let productId = req.params.id

    let product = await Product.findOneAndDelete({ _id: productId })

    if (product)
      res.status(200).send({ message: "Product deleted !" })
    else
      res.status(404).send({ message: "Product not found !" })

  } catch (error) {
    res.status(400).send({ message: "Error deleting Product !", error: error })
  }
})

module.exports = app