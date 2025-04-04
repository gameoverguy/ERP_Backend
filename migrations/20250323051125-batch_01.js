"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("batch", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      batchId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bomName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      initialWeight: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      currentWeight: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      totalWaste: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      employeeCount: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      currentStatus: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      startDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      endDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Set AUTO_INCREMENT starting point to 10001 for 'id' column
    await queryInterface.sequelize.query(
      "ALTER TABLE `batch` AUTO_INCREMENT = 10001;"
    );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("batch");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
