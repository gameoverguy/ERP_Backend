"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BOMRawMaterials extends Model {
    static associate(models) {
      // Future associations
    }
  }
  BOMRawMaterials.init(
    {
      bomId: {
        type: DataTypes.STRING,
        references: {
          model: "bom",
          key: "bomId",
        },
        onDelete: "CASCADE",
        primaryKey: true,
      },
      materialId: {
        type: DataTypes.STRING,
        references: {
          model: "raw_materials",
          key: "materialId",
        },
        onDelete: "CASCADE",
        primaryKey: true,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.FLOAT, // Amount of material required
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "BOMRawMaterials",
      tableName: "bomrawmaterials",
      timestamps: false,
    }
  );

  return BOMRawMaterials;
};
