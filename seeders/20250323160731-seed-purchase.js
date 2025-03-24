"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("purchase", [
      {
        invoiceNumber: "INV001",
        PO_Number: "PO1001",
        vendorId: "V10001",
        vendorName: "SpicesIndia Pvt Ltd",
        purchaseDate: new Date("2025-03-20"),
        materialId: "RM10003",
        materialName: "chilli_grade_A",
        weight: 50.0,
      },
      {
        invoiceNumber: "INV002",
        PO_Number: "PO1002",
        vendorId: "V10002",
        vendorName: "FreshMasala Co.",
        purchaseDate: new Date("2025-03-21"),
        materialId: "RM10004",
        materialName: "chilli_grade_B",
        weight: 100.0,
      },
      {
        invoiceNumber: "INV003",
        PO_Number: "PO1003",
        vendorId: "V10003",
        vendorName: "GoldenSpices Traders",
        purchaseDate: new Date("2025-03-22"),
        materialId: "RM10003",
        materialName: "chilli_grade_A",
        weight: 75.0,
      },
      {
        invoiceNumber: "INV004",
        PO_Number: "PO1004",
        vendorId: "V10001",
        vendorName: "SpicesIndia Pvt Ltd",
        purchaseDate: new Date("2025-03-23"),
        materialId: "RM10004",
        materialName: "chilli_grade_B",
        weight: 120.0,
      },
      {
        invoiceNumber: "INV005",
        PO_Number: "PO1005",
        vendorId: "V10002",
        vendorName: "FreshMasala Co.",
        purchaseDate: new Date("2025-03-23"),
        materialId: "RM10003",
        materialName: "chilli_grade_A",
        weight: 30.0,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("purchase", null, {});
  },
};
