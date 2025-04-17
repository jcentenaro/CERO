const { Router } = require("express");
const router = Router();

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
// ó
// const express = require("express");
// const router = express.Router();

const controller = require("../controllers/shopController");

router.get("/", controller.shopview);

router.get("/item/:id", controller.idView);
router.post("/item/:id/add", controller.itemView);

module.exports = router;
