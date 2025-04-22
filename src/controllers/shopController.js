const fs = require("fs"); //permite borrar las imagenes de los productos borrados
const path = require("path");
const sharp = require("sharp"); // Para controlar los cambios en las imagenes antes de guardarlas
// LLamo a express-validator del Rroutes
const { validationResult } = require("express-validator");

const model = require("../models/product")

const shopview = async (req, res) => {
  try {
    const productos = await model.findAll();
    // Truncar nombres a 50 caracteres
    productos.forEach(producto => {
      if (producto.nombre && producto.nombre.length > 50) {
        producto.nombre = producto.nombre.substring(0, 50) + '...';
      }
      // Opcional: Truncar descripción también, si lo deseas
      // if (producto.descripcion && producto.descripcion.length > 100) {
      //   producto.descripcion = producto.descripcion.substring(0, 100) + '...';
      // }
    });
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
      res.render("shop/item", { values: producto, layout: "layouts/layout" });
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

const cartView = (_req, res) => {
  res.render("shop/cart"); // Cambiado de "/cart" a "shop/cart"
};

const checkoutView = (_req, res) => {
  res.render("shop/checkout"); // Cambiado de "/checkout" a "shop/checkout"
};

module.exports = {
  shopview,
  idView,
  itemView,
  cartView,
  checkoutView
};
