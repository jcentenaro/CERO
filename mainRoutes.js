const express = require("express");
const router = express.Router();
const controller = require("../controllers/mainController");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const nodemailer = require("nodemailer");
require("dotenv").config();

// Ruta para procesar el formulario de contacto
router.post("/enviar", async (req, res) => {
    // Obtener los datos del formulario
    const { Name, LastName, Email, phone, Subject, Message } = req.body;

    // Configurar el transporte de Nodemailer
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com", // Cambia esto si usas otro proveedor de correo
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER, // Email del remitente (variable de entorno)
            pass: process.env.EMAIL_PASS, // Contraseña del remitente (variable de entorno)
        },
    });

    // Configurar los detalles del correo
    const mailOptions = {
        from: `"${Name} ${LastName}" <${Email}>`, // Quién envía
        to: "testeoformularios+taller@gmail.com", // Destinatario real
        bcc: "juancentenaro@gmail.com", // Copia oculta
        subject: "Mensaje Site Peluquería para Perros", // Asunto
        text: `Nombre: ${Name}\nEmail: ${Email}\nTeléfono: ${phone}\nAsunto:\n${Subject}\nMensaje:\n${Message}`,
        html: `
            <p><strong>Nombre:</strong> ${Name} ${LastName}</p>
            <p><strong>Email:</strong> ${Email}</p>
            <p><strong>Teléfono:</strong> ${phone}</p>
            <p><strong>Asunto:</strong> ${Subject}</p>
            <p><strong>Mensaje:</strong> ${Message}</p>

        `,
        replyTo: Email, // Responder a quien completó el campo Email del formulario
    };

    try {
        // Enviar el correo
        await transporter.sendMail(mailOptions);

        // Renderizar la vista de éxito
        res.status(200).render("success", {
            currentRoute: "/success",
            titulo: "Taller Mecánico Ariel - Especialistas en cambios de distribución",
            title: "Mensaje Enviado",
            mensaje: "mensaje deMansaje Enviado",
            message: "Mensaje Enviado",
            ciudad: "Ciudad de Mensaje Enviado",
            tituloabout: "Taller Mecánico Ariel - Especialistas en cambios de distribución",
            zona: "Zona de Mensaje Enviado"
        });
    } catch (error) {
        console.error("Error al enviar el correo:", error);

        // Renderizar una vista de error
        res.status(500).render("error", {
            title: "Error al enviar",
            message: "Hubo un problema al enviar tu mensaje. Intenta nuevamente más tarde.",
            titulo: "Titulo",

        });
    }
});

router.get("/about", controller.about);
router.get("/booking", controller.booking);
router.get("/contact", controller.contact);
router.get("/", controller.index);
router.get("/services", controller.services);
router.get("/team", controller.team);
router.get("/testimonial", controller.testimonial);

router.get("/success", controller.success);

// router.get("/tyc", controller.tyc);
router.get('/terminos_y_condiciones', (req, res) => {
    res.render('terminos_y_condiciones', {
        layout: 'layouts/layout.ejs', // Especificas el layout alternativo
        titulo: 'Términos y Condiciones', // Pasas un título para la página
        ciudad: "CABA Norte",
        zona: "De CABA Norte a San Isidro"
    });
});

module.exports = router;