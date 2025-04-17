"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StockTransferItem extends Model {
    static associate(models) {
      StockTransferItem.belongsTo(models.StockTransferOrder, {
        foreignKey: "stockTransferOrderNumber",
        targetKey: "stockTransferOrderNumber",
      });
    }
  }

  StockTransferItem.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stockTransferOrderNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      batchNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      packet_size: {
        type: DataTypes.ENUM("50g", "100g", "200g", "500g"),
        allowNull: true,
      },
      quantity: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "StockTransferItem",
      tableName: "stock_transfer_items",
      timestamps: false,
    }
  );

  return StockTransferItem;
};
