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
      {
        batchId: "BATCH004",
        initialWeight: 350,
        status: "Cleaning",
        startedAt: new Date("2025-03-10T08:00:00"),
        completedAt: new Date("2025-03-11T10:00:00"),
        processDuration: "02:00:00",
        initialProcessWeight: 350,
        processWaste: 5,
      },
      {
        batchId: "BATCH004",
        initialWeight: 345,
        status: "Grinding",
        startedAt: new Date("2025-03-11T11:00:00"),
        completedAt: new Date("2025-03-13T14:00:00"),
        processDuration: "27:00:00",
        initialProcessWeight: 345,
        processWaste: 10,
      },
      {
        batchId: "BATCH004",
        initialWeight: 335,
        status: "Complete",
        startedAt: new Date("2025-03-13T15:00:00"),
        completedAt: new Date("2025-03-15T17:00:00"),
        processDuration: "26:00:00",
        initialProcessWeight: 335,
        processWaste: 5,
      },
      {
        batchId: "BATCH005",
        initialWeight: 450,
        status: "Cleaning",
        startedAt: new Date("2025-03-12T07:00:00"),
        completedAt: new Date("2025-03-13T09:00:00"),
        processDuration: "02:00:00",
        initialProcessWeight: 450,
        processWaste: 5,
      },
      {
        batchId: "BATCH005",
        initialWeight: 445,
        status: "Drying",
        startedAt: new Date("2025-03-13T10:00:00"),
        completedAt: new Date("2025-03-16T16:00:00"),
        processDuration: "30:00:00",
        initialProcessWeight: 445,
        processWaste: 5,
      },
      {
        batchId: "BATCH005",
        initialWeight: 440,
        status: "Complete",
        startedAt: new Date("2025-03-17T09:00:00"),
        completedAt: new Date("2025-03-18T14:00:00"),
        processDuration: "05:00:00",
        initialProcessWeight: 440,
        processWaste: 0,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("batchhistory", null, {});
  },
};
