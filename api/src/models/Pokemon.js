const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemon', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    vida:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    ataque:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    defensa:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    velocidad:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    altura:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    peso:{
      type: DataTypes.STRING,
      allowNull: true,
    },
    createInDb:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    imagen:{
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png'
    },
  });
};