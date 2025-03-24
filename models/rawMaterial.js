"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class RawMaterial extends Model {
    static associate(models) {
      // Many-to-Many Relationship with BOM
      RawMaterial.belongsToMany(models.BOM, {
        through: models.BOMRawMaterials,
        foreignKey: "materialId",
        otherKey: "bomId",
        sourceKey: "materialId",
        targetKey: "bomId",
      });
    }
  }

  RawMaterial.init(
    {
      materialId: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      materialName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      minStock: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "RawMaterial",
      tableName: "raw_materials",
      timestamps: false,
    }
  );

  // After update hook to sync minStock with RawMaterialStock
  RawMaterial.afterUpdate(async (rawMaterial, options) => {
    try {
      const stock = await sequelize.models.RawMaterialStock.findOne({
        where: { materialName: rawMaterial.materialName },
      });

      if (stock) {
        stock.minStock = rawMaterial.minStock;
        await stock.save();
      }
    } catch (error) {
      console.error("Error updating minStock in RawMaterialStock:", error);
    }
  });

  return RawMaterial;
};
