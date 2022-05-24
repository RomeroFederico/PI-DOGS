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
      allowNull: false,
      /*AGREGAR VALIDACIONES*/
      set(value) {
        this.setDataValue('nombre', value.split(' ').map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join(' '));
      }
    },

    altura: {
      type: DataTypes.STRING,
      allowNull: false,

      set(value) {
        this.setDataValue('altura', value.join(' - '));
      },

      get() {
        return this.getDataValue('altura').split(' - ').map(n => Number(n));
      }
    },

    peso: {
      type: DataTypes.STRING,
      allowNull: false,

      set(value) {
        this.setDataValue('peso', value.join(' - '));
      },

      get() {
        return this.getDataValue('peso').split(' - ').map(n => Number(n));
      }
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
          id: this.id + 'C',
          nombre: this.nombre,
          peso: this.peso,
          imagen: this.imagen,
        };
      }
    }
  },
  {
    timestamps: false
  })
};