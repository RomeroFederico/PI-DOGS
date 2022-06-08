const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const REGEXP_BREED = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+[-–\s]?[a-zA-ZÀ-ÿ\u00f1\u00d1]*[-–\s]?[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/;

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
      unique: true,
      /*AGREGAR VALIDACIONES*/
      set(value) {
        if (!REGEXP_BREED.test(value)) throw new Error('El nombre posee caracteres invalidos.');
        if (value.length < 3) throw new Error('El nombre posee menos de tres caracteres, no es valido.');
        if (value.length > 35) throw new Error('El nombre posee mas de 35 caracteres, no es valido.');
        this.setDataValue('nombre', value.split(' ').map(s => s[0].toUpperCase() + s.slice(1).toLowerCase()).join(' '));
      }
    },

    altura: {
      type: DataTypes.STRING,
      allowNull: false,

      set(value) {
        if (!Array.isArray(value)) throw new Error('La altura debe ser un arreglo.');
        if (value.some(v => isNaN(v) || !Number.isInteger(v) || v > 100 || v < 10))
          throw new Error('La altura posee valores invalidos.');
        if (value.length < 1 || value.length > 2) throw new Error('La altura debe contener 1 o 2 valores.');
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
        if (!Array.isArray(value)) throw new Error('El peso debe ser un arreglo.');
        if (value.some(v => isNaN(v) || !Number.isInteger(v) || v > 100 || v < 1))
          throw new Error('El peso posee valores invalidos.');
        if (value.length < 1 || value.length > 2) throw new Error('El peso debe contener 1 o 2 valores.');
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