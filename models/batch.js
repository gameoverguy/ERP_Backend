"use strict";
const { Model, Sequelize } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Batch extends Model {
    static associate(models) {
      Batch.hasMany(models.BatchHistory, {
        foreignKey: "batchId",
        sourceKey: "batchId",
      });
    }
  }

  Batch.init(
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
      bomName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      initialWeight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      currentWeight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      totalWaste: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      employeeCount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      currentStatus: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Batch",
      tableName: "batch",
      timestamps: false,
    }
  );

  return Batch;
};
