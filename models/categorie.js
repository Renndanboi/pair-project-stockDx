'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categorie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categorie.hasMany(models.Shoeshascategorie,{
        foreignKey : "CategoriesId"
      })
    }
  }
  Categorie.init({
    categoriesName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Categorie',
  });
  return Categorie;
};