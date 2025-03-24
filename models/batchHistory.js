"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class BatchHistory extends Model {
    static associate(models) {
      BatchHistory.belongsTo(models.Batch, {
        foreignKey: "batchId",
        targetKey: "batchId",
      });
    }
  }

  BatchHistory.init(
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
      initialWeight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      startedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      processDuration: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      initialProcessWeight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      processWaste: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "BatchHistory",
      tableName: "batchhistory",
      timestamps: false,
    }
  );

  return BatchHistory;
};
