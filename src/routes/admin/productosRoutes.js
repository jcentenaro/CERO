const express = require("express");
const router = express.Router();
// Requiero Multer
const multer = require("multer");
// Le digo a Multetr que guarde en memoria
const upload = multer ({ storage: multer.memoryStorage( )});
// EXPRESS VALIDATOR
// Requiero el body
const { body } = require("express-validator");
const validations = [
    body("nombre")
        .not()
        .isEmpty()
        .withMessage("El nombre es obligatorio")
        .bail() //sin bail me entrega los 2 error a la vez, ,nombre y precio
        .isLength({ min: 3 })
        .withMessage("El nombre tiene que tener mínimo 3 caracteres"),
    body("precio")
        .not()
        .isEmpty()
        .withMessage("El precio es obligatorio"),
];

const controller = require("../../controllers/admin/productoController");

// CRUD = Create, Read, Update, Delete

router.get("/", controller.index);

router.get("/create", controller.create)
router.post("/", upload.single("imagen"), validations, controller.store); // agrego parte de multer y valiadtions DESPUES de multer

router.get("/:id/edit", controller.edit)
router.put("/:id", upload.single("imagen"), validations, controller.update);

router.delete("/:id", controller.destroy);


module.exports = router;
