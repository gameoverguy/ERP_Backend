"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("raw_materials", [
      {
        id: 10001,
        materialId: "RM10001",
        materialName: "sugarcane",
        minStock: 500,
      },
      {
        id: 10002,
        materialId: "RM10002",
        materialName: "wheat",
        minStock: 300,
      },
      {
        id: 10003,
        materialId: "RM10003",
        materialName: "chilli_grade_A",
        minStock: 300,
      },
      {
        id: 10004,
        materialId: "RM10004",
        materialName: "salt_refined",
        minStock: 200,
      },
      {
        id: 10005,
        materialId: "RM10005",
        materialName: "oil_sunflower",
        minStock: 400,
      },
      {
        id: 10006,
        materialId: "RM10006",
        materialName: "rice_basmati",
        minStock: 450,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("raw_materials", null, {});
  },
};
