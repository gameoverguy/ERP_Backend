"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("warehouses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      warehouseId: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      warehouseName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      locationType: {
        type: Sequelize.ENUM("factory", "warehouse", "3PL"),
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      contactPerson: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      contactNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive"),
        allowNull: true,
        defaultValue: "active",
      },
    });

    // Set AUTO_INCREMENT starting point to 10001 for 'id' column
    await queryInterface.sequelize.query(
      "ALTER TABLE `warehouses` AUTO_INCREMENT = 10001;"
    );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("warehouses");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
