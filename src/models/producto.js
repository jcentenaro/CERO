const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const producto = sequelize.define(
    'producto',
    {
          nombre: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          description: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          precio: {
            type: DataTypes.FLOAT,
            allowNull: false,
          },
          stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          discount: {
            type: DataTypes.INTEGER,
            allowNull: true,
          },
          sku: {
            type: DataTypes.STRING,
            allowNull: true,
          }, 
});

//Fuerzo la creción, alteración o borrado de la tabla en BD
(async ()=> {
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true });
    // await sequelize.sync();

})();

// console.log('La tabla de productos fue creada exitosamente!');

module.exports = producto;
