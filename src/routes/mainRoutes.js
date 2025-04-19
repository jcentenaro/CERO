const { Router } = require("express");
const router = Router();
// ó
// const express = require("express");
// const router = express.Router();

const controller = require("../controllers/mainController");

router.get("/", controller.index);
router.get("/contacto", controller.contact);
router.post("/contacto", controller.sendContactForm);
router.get("/faqs", controller.faqs);
router.get("/nosotros", controller.us);
router.get("/blog", controller.blog);
router.get("/blogsingle", controller.blogsingle);

module.exports = router;
