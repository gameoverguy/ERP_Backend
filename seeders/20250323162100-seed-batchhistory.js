"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "batchhistory",
      [
        {
          batchId: "BAT10001",
          initialWeight: 220,
          status: "Cleaning",
          startedAt: "2025-04-03 10:44:00",
          completedAt: "2025-04-03 10:48:00",
          processDuration: "00:03:39",
          initialProcessWeight: 220,
          processWaste: 10,
        },
        {
          batchId: "BAT10002",
          initialWeight: 330,
          status: "Cleaning",
          startedAt: "2025-04-03 10:45:00",
          completedAt: "2025-04-03 10:49:00",
          processDuration: "00:03:58",
          initialProcessWeight: 330,
          processWaste: 10,
        },
        {
          batchId: "BAT10003",
          initialWeight: 200,
          status: "Cleaning",
          startedAt: "2025-04-03 10:45:00",
          completedAt: "2025-04-03 11:00:00",
          processDuration: "00:14:59",
          initialProcessWeight: 200,
          processWaste: 10,
        },
        // Add remaining entries based on the data
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("batchhistory", null, {});
  },
};
