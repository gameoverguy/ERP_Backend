"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("bomrawmaterials", [
      {
        id: 7,
        bomId: "BM10001",
        materialId: "RM10003",
        quantity: 200,
      },
      {
        id: 8,
        bomId: "BM10001",
        materialId: "RM10004",
        quantity: 20,
      },
      {
        id: 9,
        bomId: "BM10002",
        materialId: "RM10004",
        quantity: 30,
      },
      {
        id: 10,
        bomId: "BM10002",
        materialId: "RM10002",
        quantity: 300,
      },
      {
        id: 11,
        bomId: "BM10003",
        materialId: "RM10001",
        quantity: 200,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bomrawmaterials", null, {});
  },
};
