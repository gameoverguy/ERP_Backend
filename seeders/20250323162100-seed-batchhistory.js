"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("batchhistory", [
      {
        batchId: "BATCH001",
        initialWeight: 500,
        status: "Cleaning",
        startedAt: new Date("2025-03-01T08:00:00"),
        completedAt: new Date("2025-03-02T12:00:00"),
        processDuration: "04:00:00",
        initialProcessWeight: 500,
        processWaste: 5,
      },
      {
        batchId: "BATCH001",
        initialWeight: 495,
        status: "Drying",
        startedAt: new Date("2025-03-02T13:00:00"),
        completedAt: new Date("2025-03-05T15:00:00"),
        processDuration: "72:00:00",
        initialProcessWeight: 495,
        processWaste: 10,
      },
      {
        batchId: "BATCH002",
        initialWeight: 300,
        status: "Cleaning",
        startedAt: new Date("2025-03-05T09:00:00"),
        completedAt: new Date("2025-03-06T11:00:00"),
        processDuration: "02:00:00",
        initialProcessWeight: 300,
        processWaste: 5,
      },
      {
        batchId: "BATCH002",
        initialWeight: 295,
        status: "Grinding",
        startedAt: new Date("2025-03-06T12:00:00"),
        completedAt: null,
        processDuration: null,
        initialProcessWeight: 295,
        processWaste: null,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("batchhistory", null, {});
  },
};
