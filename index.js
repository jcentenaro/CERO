require("dotenv").config();

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const methodOverride = require("method-override");

// app.use((req, res, next) => {
//   res.send("Sitio en mantenimiento");
// });

//Llamo a sequelize 
const sequelize = require("./src/models/db");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./src/views"));

app.use(expressLayouts);
app.set("layout", "layouts/layout")

app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

app.use(express.urlencoded({ extended: false }));

const mainRoutes = require("./src/routes/mainRoutes");
app.use(mainRoutes);
app.use("/", require("./src/routes/mainRoutes.js"));

app.use("/admin/productos", require("./src/routes/admin/productosRoutes"));
app.use("/shop", require("./src/routes/shopRoutes.js"));

app.use((req, res, next) => {
  res.status(404).send("La pagina no existe");
});

const PORT = process.env.PORT || 3001;
// Agrego try catch para conectarme a la BD
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.log(error)
  }
 console.log(`http://localhost:${PORT}`)
});
