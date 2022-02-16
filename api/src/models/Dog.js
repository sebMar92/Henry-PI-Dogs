const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    height: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    weight: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lifespan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    fromDatabase: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  });
};