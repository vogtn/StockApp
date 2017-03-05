'use strict';
module.exports = function(sequelize, DataTypes) {
  var portfolio = sequelize.define('portfolio', {
    stock_id: DataTypes.TEXT,
    stock_price: DataTypes.TEXT,
    date: DataTypes.DATE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return portfolio;
};