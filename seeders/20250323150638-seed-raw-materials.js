"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("raw_materials", [
      {
        materialId: "RM10001",
        materialName: "sugar_fine",
        minStock: 500,
      },
      {
        materialId: "RM10002",
        materialName: "wheat_flour",
        minStock: 200,
      },
      {
        materialId: "RM10003",
        materialName: "chilli_grade_A",
        minStock: 300,
      },
      {
        materialId: "RM10004",
        materialName: "salt_refined",
        minStock: 150,
      },
      {
        materialId: "RM10005",
        materialName: "oil_sunflower",
        minStock: 400,
      },
      {
        materialId: "RM10006",
        materialName: "rice_basmati",
        minStock: 600,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("raw_materials", null, {});
  },
};
