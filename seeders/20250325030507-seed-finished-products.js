"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("finished_Products", [
      {
        batchId: "BATCH001",
        productName: "Chilli Powder - Grade A",
        "50g": 100.0,
        "100g": 80.0,
        "200g": 60.0,
        "500g": 40.0,
        mfdDate: new Date("2025-03-01"),
        expDate: new Date("2026-03-01"),
      },
      {
        batchId: "BATCH002",
        productName: "Chilli Powder - Grade B",
        "50g": 90.0,
        "100g": 70.0,
        "200g": 50.0,
        "500g": 30.0,
        mfdDate: new Date("2025-03-05"),
        expDate: new Date("2026-03-05"),
      },
      {
        batchId: "BATCH003",
        productName: "Turmeric Powder",
        "50g": 110.0,
        "100g": 90.0,
        "200g": 70.0,
        "500g": 50.0,
        mfdDate: new Date("2025-03-10"),
        expDate: new Date("2026-03-10"),
      },
      {
        batchId: "BATCH004",
        productName: "Coriander Seeds Powder",
        "50g": 120.0,
        "100g": 100.0,
        "200g": 80.0,
        "500g": 60.0,
        mfdDate: new Date("2025-03-15"),
        expDate: new Date("2026-03-15"),
      },
      {
        batchId: "BATCH005",
        productName: "Mustard Seeds Powder",
        "50g": 130.0,
        "100g": 110.0,
        "200g": 90.0,
        "500g": 70.0,
        mfdDate: new Date("2025-03-20"),
        expDate: new Date("2026-03-20"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("finished_Products", null, {});
  },
};
