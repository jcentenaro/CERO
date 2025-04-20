const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const licence = sequelize.define("licence", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  });

  
  module.exports = licence;