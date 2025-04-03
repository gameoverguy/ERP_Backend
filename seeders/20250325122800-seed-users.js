"use strict";

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("users", [
      {
        id: 10001,
        userId: "KM10001",
        password:
          "$2b$10$FQkJ5MzRZBIqFk5wDGcpF.oR6Cg0AvuT/X37vw6.hBSPjwJatmfRS",
        firstName: "Super",
        lastName: "Admin",
        displayName: "Super Admin",
        role: "superadmin",
        address: "123 Admin St, City",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10002,
        userId: "KM10002",
        password:
          "$2b$10$TvDbb6GBFYU9pkx9FaYY0.e0N1neL1Q6PUb3.wOsqomzGWTE1Gr8G",
        firstName: "Process",
        lastName: "Admin",
        displayName: "Process Admin",
        role: "processadmin",
        address: "456 Process St, City",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10003,
        userId: "KM10003",
        password:
          "$2b$10$1nKucmChLXUvGT7okfPel.8p77Uq5wDNnWsIPzNL/m69sUctnSyle",
        firstName: "Purchase",
        lastName: "Admin",
        displayName: "Purchase Admin",
        role: "purchaseadmin",
        address: "789 Purchase Ave, City",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10004,
        userId: "KM10004",
        password:
          "$2b$10$6YZpfbdKwGG74co3ZA4NW.6KS53QjmcvsC36YGWF4LsZ9F2H/jBKu",
        firstName: "Inventory",
        lastName: "Admin",
        displayName: "Inventory Admin",
        role: "inventoryadmin",
        address: "321 Inventory Rd, City",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 10005,
        userId: "KM10005",
        password:
          "$2b$10$r7dwKrvZPg5fzzy/5vF.2uTa/Dw9oqM8u.FXjY49fjrfwV2CkLLTO",
        firstName: "Package",
        lastName: "Admin",
        displayName: "Package Admin",
        role: "packageadmin",
        address: "654 Package Blvd, City",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
