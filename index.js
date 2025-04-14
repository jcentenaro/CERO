const express = require("express");
const expressEjsLayouts = require("express-ejs-layouts");
const path = require('path') 
const app = express();
const expressLayouts = require("express-ejs-layouts");


//Modifico para VERCEL
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));

app.set("view engine", "ejs");
//Modifico para VECEL
// app.set("views", "./src/views")
app.set("views", path.join(__dirname, "/src/views"));

app.use(expressLayouts);
app.set("layout", "./layouts/layout")

app.use(express.urlencoded({ extended: false}));

app.use(require("./src/routes/admin/tareasRoute"))

const PORT = 3000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));