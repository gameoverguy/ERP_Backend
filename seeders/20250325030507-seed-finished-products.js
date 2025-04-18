"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "finished_products",
      [
        {
          batchId: "BAT10001",
          productName: "chilliPowder_grade_A",
          "50g": 120,
          "100g": 240,
          "200g": 100,
          "500g": 70,
          mfdDate: "2025-03-01 05:30:00",
          expDate: "2025-03-01 05:30:00",
        },
        {
          batchId: "BAT10002",
          productName: "Wheat_flour",
          "50g": 570,
          "100g": 240,
          "200g": 153,
          "500g": 120,
          mfdDate: "2025-03-01 05:30:00",
          expDate: "2025-03-01 05:30:00",
        },
        {
          batchId: "BAT10003",
          productName: "sugar",
          "50g": 120,
          "100g": 350,
          "200g": 450,
          "500g": 56,
          mfdDate: "2025-03-01 05:30:00",
          expDate: "2025-03-01 05:30:00",
        },
        {
          batchId: "BAT10004",
          productName: "chilliPowder_grade_A",
          "50g": 650,
          "100g": 325,
          "200g": 25,
          "500g": 50,
          mfdDate: "2025-03-01 05:30:00",
          expDate: "2025-03-01 05:30:00",
        },
        {
          batchId: "BAT10005",
          productName: "Wheat_flour",
          "50g": 630,
          "100g": 230,
          "200g": 180,
          "500g": 75,
          mfdDate: "2025-03-01 05:30:00",
          expDate: "2025-03-01 05:30:00",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("finished_products", null, {});
  },
};
