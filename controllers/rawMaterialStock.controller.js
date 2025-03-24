const { where } = require("sequelize");
const { RawMaterialStock, RawMaterial } = require("../models");

async function upsert_RawMaterialStock(req, res) {
  try {
    const { rawMaterial, purchaseDate, weight } = req.body;

    let materialName = rawMaterial.materialName;

    // Check if material exists using materialName
    let material = await RawMaterialStock.findOne({ where: { materialName } });

    let rm = await RawMaterial.findOne({ where: { materialName } });

    if (material) {
      // Update the existing material's weight and purchase date
      material.currentStock = material.currentStock + parseFloat(weight);
      material.minStock = rm.minStock;

      await material.save();

      return res
        .status(200)
        .json({ message: "Material updated successfully", data: material });
    } else {
      // Create a new material entry
      const newMaterial = await RawMaterialStock.create({
        materialName,
        currentStock: weight,
        minStock: rm.minStock,
        lastRestockDate: purchaseDate,
      });

      return res
        .status(201)
        .json({ message: "Material created successfully", data: newMaterial });
    }
  } catch (error) {
    console.error("Error in create_or_update_RawMaterialStock:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function index(req, res) {
  try {
    const materials = await RawMaterialStock.findAll();
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching raw materials:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = { index, upsert_RawMaterialStock };
