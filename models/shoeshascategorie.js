'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shoeshascategorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Shoeshascategorie.belongsTo(models.Categorie,{
      foreignKey : "CategoriesId"
     })
     Shoeshascategorie.belongsTo(models.Shoe,{
      foreignKey: "ShoesId"
     })
    }
  }
  Shoeshascategorie.init({
    ShoesId: DataTypes.INTEGER,
    CategoriesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Shoeshascategorie',
  });
  return Shoeshascategorie;
};