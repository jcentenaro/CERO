const index = (req, res) => {
  res.render("inicio", { title: "Título desde el Controller" });
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
