//Llamo a nodemailer para envío de form
const nodemailer = require("nodemailer");
//requiero la conexión a bd
const db = require("../config/db");
 
const index = (req, res) => {
  res.render("inicio", { title: "Título desde el Controller" });
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
