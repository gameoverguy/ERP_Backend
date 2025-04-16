"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    static associate(models) {
      // define associations here if needed
    }
  }

  Warehouse.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      warehouseId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      warehouseName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      locationType: {
        type: DataTypes.ENUM("factory", "warehouse", "3PL"),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      contactPerson: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive"),
        allowNull: true,
        defaultValue: "active",
      },
    },
    {
      sequelize,
      modelName: "Warehouse",
      tableName: "warehouses",
      timestamps: false,
    }
  );

  return Warehouse;
};

// {
//   "warehouseName": "Chennai Central Warehouse",
//   "locationType": "warehouse",
//   "address": "Plot No. 45, Industrial Area, Chennai, Tamil Nadu - 600001",
//   "contactPerson": "Rajesh Kumar",
//   "contactNumber": "9876543210",
//   "status": "active"
// }
