"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("stock_transfer_Orders", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      stockTransferOrderNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      source_warehouse_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      destination_warehouse_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("pending", "received"),
        defaultValue: "pending",
        allowNull: true,
      },
      dispatch_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      received_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      vehicle_number: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      driver_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    });

    await queryInterface.sequelize.query(
      "ALTER TABLE `stock_transfer_Orders` AUTO_INCREMENT = 10001;"
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("stock_transfer_Orders");
  },
};
