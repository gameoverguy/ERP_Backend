"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("raw_materials", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      materialId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      materialName: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      minStock: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });

    // Set AUTO_INCREMENT starting point to 10001 for 'id' column
    await queryInterface.sequelize.query(
      "ALTER TABLE `raw_materials` AUTO_INCREMENT = 10001;"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("raw_materials");
  },
};
