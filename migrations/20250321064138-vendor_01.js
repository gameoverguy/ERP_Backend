"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("vendor", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      vendorId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      vendorName: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      registrationNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      gstNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      website: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bankName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bankBranch: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bankAccountNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      ifsc: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      micr: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    // Set AUTO_INCREMENT starting point to 10001 for 'id' column
    await queryInterface.sequelize.query(
      "ALTER TABLE `vendor` AUTO_INCREMENT = 10001;"
    );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("vendor");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
