const utils = require("../functions/utils");
const { Purchase } = require("../models");

async function addPurchase(req, res) {
  try {
    console.log("Received data:", req.body);
    const {
      invoiceNumber,
      PO_Number,
      rawMaterial,
      vendor,
      purchaseDate,
      weight,
    } = req.body;

    let materialId = rawMaterial.materialId;
    let materialName = rawMaterial.materialName;
    let vendorId = vendor.vendorId;
    let vendorName = vendor.vendorName;

    // Step 1: Create BOM Entry Without bomId
    const newPurchase = await Purchase.create({
      invoiceNumber,
      PO_Number,
      materialId,
      materialName,
      vendorId,
      vendorName,
      purchaseDate,
      weight,
    });

    return res.status(201).json({
      message: "BOM created successfully",
      data: newPurchase,
    });
  } catch (error) {
    console.error("Error creating BOM:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function index(req, res) {
  try {
    const purchases = await Purchase.findAll();

    const formattedPurchases = purchases.map((p) => ({
      ...p.toJSON(), // Convert Sequelize instance to plain object
      purchaseDate: utils.formattedDate(p.purchaseDate), // Format purchaseDate
    }));

    res.status(200).json(formattedPurchases);
  } catch (error) {
    console.error("Error fetching BOMs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { index, addPurchase };
