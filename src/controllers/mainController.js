//Llamo a nodemailer para envío de form
const nodemailer = require("nodemailer");
//requiero la conexión a bd
const db = require("../config/db");
// Importo el modelo de productos
const model = require("../models/product");
 
const index = async (req, res) => {
  try {
    const productos = await model.findAll(); // Obtiene los productos desde la base de datos
    // Truncar nombres a 50 caracteres, como en shopController
    productos.forEach(producto => {
      if (producto.nombre && producto.nombre.length > 50) {
        producto.nombre = producto.nombre.substring(0, 50) + '...';
      }
    });
    res.render("inicio", { 
      title: "Título desde el Controller",
      productos // Pasa los productos a la vista
    });
  } catch (error) {
    console.error("Error al cargar productos:", error);
    res.status(500).send("Error al cargar la página de inicio");
  }
};

const home = (req, res) => {
  res.render("home");
};
const contact = (req, res) => {
  res.render("contacto");
};
const faqs =(req, res) => {
  res.render("faqs");
};
const us = (req, res) => {
  res.render("nosotros");
};
const blog = (req, res) => {
  res.render("blog");
};
const blogsingle = (req, res) => {
  res.render("blog-single");
};

const sendContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Insertar datos en la base de datos
    await db.query(
      'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
      [name, email, subject, message]
    );

    // Configurar transporter de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Opciones del correo
    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      text: `Nombre: ${name}\nEmail: ${email}\nAsunto: ${subject}\nMensaje: ${message}`,
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);

    // Renderizar página de éxito
    res.render("success", { title: "Mensaje Enviado" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al procesar el formulario");
  }
};

module.exports = {
  index,
  home,
  contact,
  faqs,
  us,
  blog,
  blogsingle,
  sendContactForm
};
