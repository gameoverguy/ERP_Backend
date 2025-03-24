"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Insert BOMs
    await queryInterface.bulkInsert("bom", [
      {
        bomId: "BM10001",
        bomName: "Masala_A",
        totalWeight: 150,
      },
      {
        bomId: "BM10002",
        bomName: "Masala_B",
        totalWeight: 130,
      },
      {
        bomId: "BM10003",
        bomName: "Masala_C",
        totalWeight: 180,
      },
    ]);

    // Insert BOMRawMaterials
    await queryInterface.bulkInsert("bomrawmaterials", [
      // Masala_A
      {
        bomId: "BM10001",
        materialId: "RM10003",
        quantity: 50,
      },
      {
        bomId: "BM10001",
        materialId: "RM10004",
        quantity: 100,
      },

      // Masala_B
      {
        bomId: "BM10002",
        materialId: "RM10003",
        quantity: 30,
      },
      {
        bomId: "BM10002",
        materialId: "RM10004",
        quantity: 100,
      },

      // Masala_C
      {
        bomId: "BM10003",
        materialId: "RM10003",
        quantity: 80,
      },
      {
        bomId: "BM10003",
        materialId: "RM10004",
        quantity: 100,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("bomrawmaterials", null, {});
    await queryInterface.bulkDelete("bom", null, {});
  },
};
