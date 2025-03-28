const { Model } = require("sequelize");
const { Purchase, FinishedProduct } = require("../models");

async function index(req, res) {
  try {
    const formattedDate = (isoDate) => {
      const date = new Date(isoDate);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
      const year = date.getFullYear();
      return `${day}-${month}-${year}`; // Convert to DD-MM-YYYY
    };

    const purchases = await Purchase.findAll({
      attributes: ["purchaseDate", "materialName", "weight"], // Adjust columns as needed
    });

    const formattedPurchases = purchases.map((p) => ({
      materialName: p.materialName,
      purchaseDate: formattedDate(p.purchaseDate), // ✅ Now in DD-MM-YYYY format
      weight: p.weight,
    }));

    const finishedProducts = await FinishedProduct.findAll();

    const formattedfinishedProducts = finishedProducts.map((fp) => ({
      batchId: fp.batchId,
      "50g": fp["50g"],
      "100g": fp["100g"],
      "200g": fp["200g"],
      "500g": fp["500g"],
      productName: fp.productName,
      mfdDate: formattedDate(fp.mfdDate),
      expDate: formattedDate(fp.expDate),
    }));

    const dashboardStats = {
      purchaseData: formattedPurchases,
      finishedProductsData: formattedfinishedProducts,
    };

    res.status(200).json(formattedfinishedProducts);
  } catch (error) {
    console.error("Error fetching BOMs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { index };
