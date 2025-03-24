"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("rawmaterialStock", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      materialName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      currentStock: {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      minStock: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lastRestockDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Set AUTO_INCREMENT starting point to 10001 for 'id' column

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("rawmaterialStock");
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
