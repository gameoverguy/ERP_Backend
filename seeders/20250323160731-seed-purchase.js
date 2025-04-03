"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("purchase", [
      {
        id: 1,
        invoiceNumber: "INV10001",
        PO_Number: "PO10001",
        vendorId: "V10001",
        vendorName: "SpicesIndia Pvt Ltd",
        purchaseDate: new Date("2025-04-01"),
        materialId: "RM10001",
        materialName: "sugarcane",
        weight: 35000,
      },
      {
        id: 2,
        invoiceNumber: "INV10002",
        PO_Number: "PO10002",
        vendorId: "V10002",
        vendorName: "FreshMasala Co.",
        purchaseDate: new Date("2025-03-30"),
        materialId: "RM10002",
        materialName: "wheat",
        weight: 45000,
      },
      {
        id: 3,
        invoiceNumber: "INV10003",
        PO_Number: "PO10003",
        vendorId: "V10003",
        vendorName: "GoldenSpices Traders",
        purchaseDate: new Date("2025-03-27"),
        materialId: "RM10003",
        materialName: "chilli_grade_A",
        weight: 25000,
      },
      {
        id: 4,
        invoiceNumber: "INV10004",
        PO_Number: "PO10004",
        vendorId: "V10001",
        vendorName: "SpicesIndia Pvt Ltd",
        purchaseDate: new Date("2025-04-03"),
        materialId: "RM10004",
        materialName: "salt_refined",
        weight: 75000,
      },
      {
        id: 5,
        invoiceNumber: "INV10005",
        PO_Number: "PO10005",
        vendorId: "V10003",
        vendorName: "GoldenSpices Traders",
        purchaseDate: new Date("2025-03-18"),
        materialId: "RM10005",
        materialName: "oil_sunflower",
        weight: 60000,
      },
      {
        id: 6,
        invoiceNumber: "INV10006",
        PO_Number: "PO10006",
        vendorId: "V10001",
        vendorName: "SpicesIndia Pvt Ltd",
        purchaseDate: new Date("2025-04-01"),
        materialId: "RM10006",
        materialName: "rice_basmati",
        weight: 50000,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("purchase", null, {});
  },
};
