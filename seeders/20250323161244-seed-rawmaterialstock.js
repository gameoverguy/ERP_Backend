"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("rawmaterialStock", [
      {
        materialName: "chilli_grade_A",
        currentStock: 500.0,
        minStock: 100,
        lastRestockDate: new Date("2025-03-10"),
      },
      {
        materialName: "chilli_grade_B",
        currentStock: 300.0,
        minStock: 80,
        lastRestockDate: new Date("2025-03-15"),
      },
      {
        materialName: "turmeric_powder",
        currentStock: 150.0,
        minStock: 50,
        lastRestockDate: new Date("2025-03-12"),
      },
      {
        materialName: "coriander_seeds",
        currentStock: 400.0,
        minStock: 120,
        lastRestockDate: new Date("2025-03-18"),
      },
      {
        materialName: "mustard_seeds",
        currentStock: 250.0,
        minStock: 90,
        lastRestockDate: new Date("2025-03-20"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("rawmaterialStock", null, {});
  },
};
