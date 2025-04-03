"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("rawmaterialstock", [
      {
        id: 1,
        materialName: "chilli_grade_A",
        currentStock: 24500,
        minStock: 300,
        lastRestockDate: new Date("2025-03-10T05:30:00Z"),
      },
      {
        id: 6,
        materialName: "sugarcane",
        currentStock: 34200,
        minStock: 500,
        lastRestockDate: new Date("2025-04-01T00:00:00Z"),
      },
      {
        id: 7,
        materialName: "wheat",
        currentStock: 44100,
        minStock: 300,
        lastRestockDate: new Date("2025-03-30T00:00:00Z"),
      },
      {
        id: 8,
        materialName: "salt_refined",
        currentStock: 74810,
        minStock: 200,
        lastRestockDate: new Date("2025-04-03T00:00:00Z"),
      },
      {
        id: 9,
        materialName: "oil_sunflower",
        currentStock: 60000,
        minStock: 400,
        lastRestockDate: new Date("2025-03-18T00:00:00Z"),
      },
      {
        id: 10,
        materialName: "rice_basmati",
        currentStock: 50000,
        minStock: 450,
        lastRestockDate: new Date("2025-04-01T00:00:00Z"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("rawmaterialstock", null, {});
  },
};
