const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
const REGEXP_TEMPERAMENT = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+[-–\s]?[a-zA-ZÀ-ÿ\u00f1\u00d1]*$/;

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('temperamento', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    nombre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,

      set(value) {
        if (!REGEXP_TEMPERAMENT.test(value)) throw new Error('El nombre posee caracteres invalidos.');
        if (value.length < 3) throw new Error('El nombre posee menos de tres caracteres, no es valido.');
        if (value.length > 15) throw new Error('El nombre posee mas de 15 caracteres, no es valido.');
        this.setDataValue('nombre', value);
      }
    }
  },
  {
    timestamps: false
  })
};