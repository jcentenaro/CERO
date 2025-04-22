const fs = require("fs"); //permite borrar las imagenes de los productos borrados
const path = require("path");
const sharp = require("sharp"); // Para controlar los cambios en las imagenes antes de guardarlas
// LLamo a express-validator del Rroutes
const { validationResult } = require("express-validator");
const { error } = require("console");

const model = require("../../models/product")

const index = async (req, res) => {
  try {
    const productos = await model.findAll();
    console.log(productos);
    res.render("admin/index", { productos });
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
};

const create = (req, res) => {
  res.render("admin/create")
}

const store = async (req, res) => {
  console.log(req.body, req.file); // agrego req.file para que requiera el archivo de imagen

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.render("admin/create", {
      values: req.body, //mantengo los datos de campos bien cargados
      errors: errors.array(),
    });
  }
  //Guardo la info en BD
  try {
    const producto = await model.create(req.body);
    console.log(producto);

  // USO SHARP con validaciones y detalles de cómo quiero que guarde la imagen
  if (producto && req.file) {
  sharp(req.file.buffer)
  .resize
  (800, 1200, {
    kernel: sharp.kernel.nearest,
    fit: 'contain',
    position: 'center',
    background: { r: 232, g: 232, b: 232, alpha: 0.5 }
  })
  .toFile(path.resolve(__dirname, `../../../public/uploads/productos/producto_${producto.id}.jpg`));
  }

  res.redirect('/admin/productos')
} catch (error) {
  console.log(error);
  res.status(500).send(error);
}
};

const edit = async (req, res) => {
  try {
    const producto = await model.findByPk(req.params.id)

    if (producto) {
      res.render("admin/edit", { values: producto });
    } else {
      res.status(404).send("El producto no existe");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const update = async (req, res) => {
  console.log(req.params, req.body);

  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    return res.render("admin/edit", {
      values: req.body, //mantengo los datos de campos bien cargados
      errors: errors.array(),
    });
  }

  try {
    const affected = await model.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (affected[0] == 1) {
      if (req.file) {
        sharp(req.file.buffer)
        .resize
        (400, 600, {
          kernel: sharp.kernel.nearest,
          fit: 'contain',
          position: 'center',
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
  console.log(req.params);

  try {
    const result = await model.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(result);

    if (result === 1) {
      try {
        await fs.promises.unlink(
          path.resolve(
            __dirname,
            `../../../public/uploads/productos/producto_${req.params.id}.jpg`
          )
        );
      } catch (fileError) {
        console.log("No se encontró la imagen para eliminar o ya fue eliminada:", fileError);
        // Continúa incluso si la imagen no existe
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
  destroy,
};
