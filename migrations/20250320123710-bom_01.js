"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("bom", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bomId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      bomName: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      totalWeight: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
    });

    // Set AUTO_INCREMENT starting point to 10001 for 'id' column
    await queryInterface.sequelize.query(
      "ALTER TABLE `bom` AUTO_INCREMENT = 10001;"
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("bom");
  },
};
