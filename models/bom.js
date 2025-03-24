"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BOM extends Model {
    static associate(models) {
      // Many-to-Many Relationship with BOM
      BOM.belongsToMany(models.RawMaterial, {
        through: models.BOMRawMaterials,
        foreignKey: "bomId",
        otherKey: "materialId",
        sourceKey: "bomId",
        targetKey: "materialId",
      });
    }
  }

  BOM.init(
    {
      bomId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      bomName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      totalWeight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "BOM",
      tableName: "bom",
      timestamps: false,
    }
  );

  return BOM;
};
