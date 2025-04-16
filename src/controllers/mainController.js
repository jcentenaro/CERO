const index = (req, res) => {
  const productos = [
    { id: 1, nombre: "Producto 1" },
    { id: 2, nombre: "Producto 2" },
    { id: 3, nombre: "Producto 3" },
  ];
  res.render("inicio", { mensaje: "Mensaje incrustado desde el mainController", productos });
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

module.exports = {
  index,
  home,
  contact,
  faqs,
  us,
  blog,
  blogsingle
};
