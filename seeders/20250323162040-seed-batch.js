"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("batch", [
      {
        batchId: "BATCH001",
        bomName: "Turmeric_Powder_1kg",
        initialWeight: 500,
        currentWeight: 480,
        totalWaste: 20,
        employeeCount: 10,
        currentStatus: "Complete",
        startDate: new Date("2025-03-01"),
        endDate: new Date("2025-03-10"),
      },
      {
        batchId: "BATCH002",
        bomName: "Chilli_Powder_500g",
        initialWeight: 300,
        currentWeight: 290,
        totalWaste: 10,
        employeeCount: 8,
        currentStatus: "Grinding",
        startDate: new Date("2025-03-05"),
        endDate: null,
      },
      {
        batchId: "BATCH003",
        bomName: "Coriander_Powder_1kg",
        initialWeight: 400,
        currentWeight: 380,
        totalWaste: 20,
        employeeCount: 12,
        currentStatus: "Drying",
        startDate: new Date("2025-03-08"),
        endDate: null,
      },
      {
        batchId: "BATCH004",
        bomName: "Mustard_Powder_500g",
        initialWeight: 350,
        currentWeight: 330,
        totalWaste: 20,
        employeeCount: 9,
        currentStatus: "Complete",
        startDate: new Date("2025-03-10"),
        endDate: new Date("2025-03-15"),
      },
      {
        batchId: "BATCH005",
        bomName: "Cumin_Powder_1kg",
        initialWeight: 450,
        currentWeight: 440,
        totalWaste: 10,
        employeeCount: 11,
        currentStatus: "Complete",
        startDate: new Date("2025-03-12"),
        endDate: new Date("2025-03-18"),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("batch", null, {});
  },
};
