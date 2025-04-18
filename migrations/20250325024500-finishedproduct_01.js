"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("finished_Products", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      batchId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      warehouseId: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      warehouseName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      productName: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      "50g": {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      "100g": {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      "200g": {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      "500g": {
        type: Sequelize.FLOAT,
        allowNull: true,
      },
      mfdDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      expDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("finished_Products");
  },
};
