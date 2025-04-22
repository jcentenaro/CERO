const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const licence = sequelize.define("licence", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  });

  //Fuerzo la creción, alteración o borrado de la tabla en BD
// (async ()=> {
//   // await sequelize.sync({ force: true });
//   await sequelize.sync({ alter: true });
//   // await sequelize.sync();

// })();
  
  module.exports = licence;