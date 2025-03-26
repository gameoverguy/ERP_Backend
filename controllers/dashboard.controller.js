const { Purchase } = require("../models");

async function index(req, res) {
  try {
    const purchases = await Purchase.findAll({
      attributes: ["id", "purchaseDate", "materialName", "weight"], // Adjust columns as needed
    });

    res.status(200).json(purchases);
  } catch (error) {
    console.error("Error fetching BOMs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { index };
