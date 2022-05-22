const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('raza', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING,
      allowNull: false
      /*AGREGAR VALIDACIONES*/
    },

    altura: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    peso: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    añosDeVida: {
      type: DataTypes.INTEGER
    }
  },
  {
    timestamps: false
  })
};