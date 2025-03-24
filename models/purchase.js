"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Purchase extends Model {
    static associate(models) {}
  }

  Purchase.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      PO_Number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendorId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      vendorName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      purchaseDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      materialId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      materialName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Purchase",
      tableName: "purchase",
      timestamps: false,
    }
  );

  return Purchase;
};
