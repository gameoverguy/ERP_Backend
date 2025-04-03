"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("users", [
      {
        userId: "KM10001",
        password: "password",
        firstName: "Super",
        lastName: "Admin",
        displayName: "Super Admin",
        role: "superadmin",
        address: "123 Admin St, City",
      },
      {
        userId: "KM10002",
        password: "password",
        firstName: "John",
        lastName: "Doe",
        displayName: "John Doe",
        role: "processadmin",
        address: "456 Process St, City",
      },
      {
        userId: "KM10003",
        password: "password",
        firstName: "Jane",
        lastName: "Smith",
        displayName: "Jane Smith",
        role: "purchaseadmin",
        address: "789 Purchase Ave, City",
      },
      {
        userId: "KM10004",
        password: "password",
        firstName: "Mike",
        lastName: "Johnson",
        displayName: "Mike Johnson",
        role: "inventoryadmin",
        address: "321 Inventory Rd, City",
      },
      {
        userId: "KM10005",
        password: "password",
        firstName: "Emily",
        lastName: "Williams",
        displayName: "Emily Williams",
        role: "packageadmin",
        address: "654 Package Blvd, City",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
