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
      defaultValue: true,
    },
  });
};

// Pokemon.hasMany(Tipo,{
//   foreignKey: 'Pokemonid',
//   sourceKey: 'id',
// })

// Tipo.belongsTo(Pokemon,{
//   foreignKey: 'Pokemonid',
//   targetId: 'id',
// })