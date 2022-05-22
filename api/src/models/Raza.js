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
      type: DataTypes.STRING,
      allowNull: false
    },

    peso: {
      type: DataTypes.STRING,
      allowNull: false
    },

    añosDeVida: {
      type: DataTypes.STRING,

      get() {
        return this.getDataValue("añosDeVida") ? `${this.getDataValue("añosDeVida")} años` : null;
      }
    },

    imagen: {
      type: DataTypes.TEXT,
    },

    cardDetails: {
      type: DataTypes.VIRTUAL,

      get() {
        return { 
          id: this.id,
          nombre: this.nombre,
          peso: this.peso,
          imagen: this.imagen,
          custom: true
        };
      }
    }
  },
  {
    timestamps: false
  })
};