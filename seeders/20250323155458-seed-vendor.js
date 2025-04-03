"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("vendor", [
      {
        id: 10001,
        vendorId: "V10001",
        vendorName: "SpicesIndia Pvt Ltd",
        registrationNumber: "REG123456",
        gstNumber: "GSTIN123456789",
        website: "http://spicesindia.com",
        email: "contact@spicesindia.com",
        contactNumber: "9876543210",
        address: "123 Spice Street, Chennai, India",
        bankName: "State Bank of India",
        bankBranch: "Chennai Main Branch",
        bankAccountNumber: "123456789012",
        ifsc: "SBIN0001234",
        micr: "600002123",
      },
      {
        id: 10002,
        vendorId: "V10002",
        vendorName: "FreshMasala Co.",
        registrationNumber: "REG654321",
        gstNumber: "GSTIN987654321",
        website: "http://freshmasala.com",
        email: "info@freshmasala.com",
        contactNumber: "9871234567",
        address: "45 Spice Garden, Bangalore, India",
        bankName: "HDFC Bank",
        bankBranch: "Bangalore Central Branch",
        bankAccountNumber: "987654321098",
        ifsc: "HDFC0005678",
        micr: "560002567",
      },
      {
        id: 10003,
        vendorId: "V10003",
        vendorName: "GoldenSpices Traders",
        registrationNumber: "REG789012",
        gstNumber: "GSTIN123789456",
        website: "http://goldenspices.com",
        email: "sales@goldenspices.com",
        contactNumber: "9098765432",
        address: "78 Spice Bazaar, Mumbai, India",
        bankName: "ICICI Bank",
        bankBranch: "Mumbai South Branch",
        bankAccountNumber: "112233445566",
        ifsc: "ICIC0007890",
        micr: "400002890",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("vendor", null, {});
  },
};
