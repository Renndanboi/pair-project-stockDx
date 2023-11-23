'use strict';
const {
  Model
} = require('sequelize');
const {Op} = require('sequelize')
const formatRupiah = require('../helpers/helper')
module.exports = (sequelize, DataTypes) => {
  class Shoe extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      Shoe.belongsTo(models.User,{
        foreignKey : "UserId"
      })
      Shoe.hasMany(models.Shoeshascategorie,{
        foreignKey : "ShoesId"
      })
    }
    get formatRupiah(){
      return formatRupiah(this.price)
    }

    static async shoeAdminShowAll(){
      let data = Shoe.findAll({
        where : {
            stock : {
                [Op.gt] : 0
            }
        },
        order : [["price", "ASC"], ["stock", "ASC"]]
    })
    return data
    }

    static async shoeShowAll(orderBy){
      let options = {
        where : {
          stock : {
              [Op.gt] : 0
          }
        },
      }
      if (orderBy) {
        if (orderBy==='price') {
          options.order = [["price", "ASC"]]
        } else {
          options.order = [["stock", "ASC"]]
        }

      }
      let data = await Shoe.findAll(options)
    return data
    }
  }
  Shoe.init({
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Brand is not null"
        },
        notNull: {
          args: true,
          msg: "Brand is not empty"
        }
      }
    },
    stock: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Stock is not null"
        },
        notNull: {
          args: true,
          msg: "Stock is not empty"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Price is not null"
        },
        notNull: {
          args: true,
          msg: "Price is not empty"
        }
      }
    },
    image: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Image is not null"
        },
        notNull: {
          args: true,
          msg: "Image is not empty"
        }
      }
    },
    status: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Status is not null"
        },
        notNull: {
          args: true,
          msg: "Status is not empty"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, { hooks: {
    beforeCreate: (instance, options) => {
      instance.brand = instance.brand.toUpperCase()
    },
  },
    sequelize,
    modelName: 'Shoe',
  });
  return Shoe;
};