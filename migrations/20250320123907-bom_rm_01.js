"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bomrawmaterials", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bomId: {
        type: Sequelize.STRING,
        references: {
          model: "bom",
          key: "bomId",
        },
        onDelete: "CASCADE",
        allowNull: true,
      },
      materialId: {
        type: Sequelize.STRING,
        references: {
          model: "raw_materials",
          key: "materialId",
        },
        onDelete: "CASCADE",
        allowNull: true,
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("bomrawmaterials");
  },
};
