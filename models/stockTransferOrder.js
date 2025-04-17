"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class StockTransferOrder extends Model {
    static associate(models) {
      StockTransferOrder.hasMany(models.StockTransferItem, {
        foreignKey: "stockTransferOrderNumber",
        sourceKey: "stockTransferOrderNumber",
      });
    }
  }

  StockTransferOrder.init(
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
      source_warehouse_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      destination_warehouse_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("pending", "received"),
        defaultValue: "pending",
        allowNull: true,
      },
      dispatch_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      received_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      vehicle_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      driver_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "StockTransferOrder",
      tableName: "stock_transfer_Orders",
      timestamps: false,
    }
  );

  return StockTransferOrder;
};
