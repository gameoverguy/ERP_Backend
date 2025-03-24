"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RawMaterialStock extends Model {
    static associate(models) {}
  }

  RawMaterialStock.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      materialName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      currentStock: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      minStock: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lastRestockDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "RawMaterialStock",
      tableName: "rawmaterialStock",
      timestamps: false,
    }
  );

  return RawMaterialStock;
};
