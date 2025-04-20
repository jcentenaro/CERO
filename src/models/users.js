const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const bcryptjs = require("bcryptjs");

const users = sequelize.define("user", {
   
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  });
// encripto la clave con npm i bcryptjs, lo requiero arriba y lo pido acá abajo.  le digo cuantas veces quiero que pase el encriptador (password, 8)
  users.beforeSave(async (user, options) => {
    const { password } = user;

    const hash = await bcryptjs.hash(password, 8);

    user.password = hash
  });
// FINAL bcryptjs

  // (async () => {
  //   await sequelize.sync();
  //  await sequelize.sync({ force: true });
  //   // await sequelize.sync({ alter: true });
  // })();
  
  module.exports = users;