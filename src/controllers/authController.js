const bcryptjs = require("bcryptjs");

const { Router } = require("express");
const router = Router();

// traigo el modulo para validaciones
const { body } = require("express-validator");
// agrego el modulo para traer las validaciones
const { validationResult } = require("express-validator");

const model = require("../models/users");

const register = (req, res) => {
    res.render("auth/register");
};

const postRegister = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("auth/register", {
            values: req.body,
            errors: errors.array(),
        });
    }
    try {
        const user = await model.create(req.body);
        console.log(req.body, user);
        res.redirect("/login");
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

const login = (req, res) => {
    res.render("auth/login");
};

const postLogin = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render("auth/login", {
            values: req.body,
            errors: errors.array(),
        });
    }

    try {
        const user = await model.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.render("auth/login", {
                values: req.body,
                errors: [{ msg: "El correo o la password son incorrectas." }],
            });
        } else if (!(await bcryptjs.compare(req.body.password, user.password))) {
            res.render("auth/login", {
                values: req.body,
                errors: [{ msg: "El correo o la password son incorrectas." }],
            });
        } else {
            req.session.userId = user.id;
            console.log(req.session.userId);
            res.redirect("/admin/productos");
        }
    } catch (error) {
        console.log(error);
        res.send(error);
    }
};

const logout = (req, res) => {
    req.session = null;
    res.redirect("/");
};

module.exports = {
    register,
    postRegister,
    login,
    postLogin,
    logout,
};