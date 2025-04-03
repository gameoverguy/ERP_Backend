"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("bom", [
      {
        id: 10001,
        bomId: "BM10001",
        bomName: "chilliPowder_grade_A",
        totalWeight: 220,
      },
      {
        id: 10002,
        bomId: "BM10002",
        bomName: "Wheat_flour",
        totalWeight: 330,
      },
      {
        id: 10003,
        bomId: "BM10003",
        bomName: "sugar",
        totalWeight: 200,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bom", null, {});
  },
};
