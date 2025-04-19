"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class FinishedProduct extends Model {
    static associate(models) {}
  }

  FinishedProduct.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      batchId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      warehouseId: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "WH10001",
      },
      warehouseName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Main Factory",
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      "50g": {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      "100g": {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      "200g": {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      "500g": {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
      },
      mfdDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      expDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "FinishedProduct",
      tableName: "finished_Products",
      timestamps: false,
    }
  );

  return FinishedProduct;
};
