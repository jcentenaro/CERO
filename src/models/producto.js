const { DataTypes } = require("sequelize");
const sequelize = require("./db");

const producto = sequelize.define(
    'producto',
    {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
});

//Creo la tabla en BD
(async ()=> {
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true });
    // await sequelize.sync();

})();

// console.log('La tabla de productos fue creada exitosamente!');

module.exports = producto;
