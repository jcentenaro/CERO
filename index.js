require("dotenv").config();

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const methodOverride = require("method-override");
//REQUIERO EXPRESS-SESSION
// const session = require("express-session");
// app.use(session({ secret: "Secr3t01", resave: false, saveUninitialized: false }));
// //CHEQUEO QUE LA SESIÓN EXISTA
// const isLogin = (req, res, next) => {
//   if (!req.session.userId) {
//     return res.redirect("/login");
//   }

//   next();
// };

//CAMBIO EXPRESS-SESSION POR COOKIE-SESSION
const session = require("cookie-session");
app.use(session({
  keys: ["Secr3t01", "Secr3t02"],
})
);
const isLogin = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }

  next();
};

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
app.use(express.json());

app.use(require("./src/routes/authRoutes.js"));

const mainRoutes = require("./src/routes/mainRoutes");
app.use("/", require("./src/routes/mainRoutes.js"));

app.use("/admin/productos", isLogin, require(path.join(__dirname, "./src/routes/admin/adminRoutes")));
app.use("/shop", require(path.join(__dirname, "./src/routes/shopRoutes.js")));

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
