const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { validationResult } = require("express-validator");
const model = require("../../models/product");

const index = async (req, res) => {
    try {
        const productos = await model.findAll();
        res.render("admin/index", { 
            productos, 
            layout: "layouts/layoutadmin" // Especifica el layout de administración
        });
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const create = (req, res) => {
    res.render("admin/create", { 
        layout: "layouts/layoutadmin" // Especifica el layout de administración
    });
};

const store = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("admin/create", {
            values: req.body,
            errors: errors.array(),
            layout: "layouts/layoutadmin" // Especifica el layout de administración
        });
    }

    try {
        const producto = await model.create(req.body);

        if (producto && req.file) {
            sharp(req.file.buffer)
                .resize(800, 1200, {
                    kernel: sharp.kernel.nearest,
                    fit: "contain",
                    position: "center",
                    background: { r: 232, g: 232, b: 232, alpha: 0.5 }
                })
                .toFile(path.resolve(__dirname, `../../../public/uploads/productos/producto_${producto.id}.jpg`));
        }

        res.redirect("/admin/productos");
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const edit = async (req, res) => {
    try {
        const producto = await model.findByPk(req.params.id);

        if (producto) {
            res.render("admin/edit", { 
                values: producto, 
                layout: "layouts/layoutadmin" // Especifica el layout de administración
            });
        } else {
            res.status(404).send("El producto no existe");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("admin/edit", {
            values: req.body,
            errors: errors.array(),
            layout: "layouts/layoutadmin" // Especifica el layout de administración
        });
    }

    try {
        const affected = await model.update(req.body, {
            where: { id: req.params.id }
        });

        if (affected[0] === 1) {
            if (req.file) {
                sharp(req.file.buffer)
                    .resize(400, 600, {
                        kernel: sharp.kernel.nearest,
                        fit: "contain",
                        position: "center",
                        background: { r: 232, g: 232, b: 232, alpha: 0.5 }
                    })
                    .toFile(path.resolve(__dirname, `../../../public/uploads/productos/producto_${req.params.id}.jpg`));
            }
            res.redirect("/admin/productos");
        } else {
            res.status(500).send("Error al actualizar");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

const destroy = async (req, res) => {
    try {
        const result = await model.destroy({
            where: { id: req.params.id }
        });

        if (result === 1) {
            try {
                await fs.promises.unlink(
                    path.resolve(__dirname, `../../../public/uploads/productos/producto_${req.params.id}.jpg`)
                );
            } catch (fileError) {
                console.log("No se encontró la imagen para eliminar o ya fue eliminada:", fileError);
            }
            res.redirect("/admin/productos");
        } else {
            res.status(404).send("El producto no existe");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = {
    index,
    create,
    store,
    edit,
    update,
    destroy
};