"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class WarehouseInventory extends Model {
    static associate(models) {}
  }

  WarehouseInventory.init(
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
      productName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      "50g": {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      "100g": {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      "200g": {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      "500g": {
        type: DataTypes.FLOAT,
        allowNull: true,
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
      modelName: "WarehouseInventory",
      tableName: "WarehouseInventory",
      timestamps: false,
    }
  );

  return WarehouseInventory;
};
