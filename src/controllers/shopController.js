const fs = require("fs"); //permite borrar las imagenes de los productos borrados
const path = require("path");
const sharp = require("sharp"); // Para controlar los cambios en las imagenes antes de guardarlas
// LLamo a express-validator del Rroutes
const { validationResult } = require("express-validator");

const model = require("../models/Producto")

const shopview = async (req, res) => {
  try {
    const productos = await model.findAll();
    console.log(productos);
    
    res.render("shop/shop", { productos });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

const idView = async (req, res) => {
  try {
    const producto = await model.findByPk(req.params.id);
    console.log(producto);
    if (producto) {
      res.render("shop/item", { values: producto });
    } else {
      res.status(404).send("El producto no existe");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const itemView = (_req, res) => {
  res.send("Shop ITEM ID ADD");
};

// const itemView = (req, res) => {
//   res.render("shop/item", {title: "Vista Item"});
// };

module.exports = {
  shopview,
  idView,
  itemView,
};
