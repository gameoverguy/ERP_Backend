"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Vendor extends Model {
    static associate(models) {}
  }

  Vendor.init(
    {
      vendorId: {
        type: DataTypes.STRING, 
        allowNull: true,
        unique: true,
      },
      vendorName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      registrationNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      gstNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      website: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contactNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bankName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bankBranch: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bankAccountNumber: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      ifsc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      micr: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Vendor",
      tableName: "vendor",
      timestamps: false,
    }
  );

  return Vendor;
};
