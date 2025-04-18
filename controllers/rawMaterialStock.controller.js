//const { where } = require("sequelize");
const utils = require("../functions/utils");
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
      material.lastRestockDate = purchaseDate;

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

async function deductRawMaterialStock(req, res) {
  try {
    const { materialName, quantityToDeduct } = req.body;

    // Check if material exists
    let material = await RawMaterialStock.findOne({ where: { materialName } });

    if (!material) {
      return res.status(404).json({ message: "Material not found" });
    }

    const remainingStock = material.currentStock - parseFloat(quantityToDeduct);

    if (remainingStock < 0) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    // Update stock
    material.currentStock = remainingStock;
    await material.save();

    return res
      .status(200)
      .json({ message: "Stock deducted successfully", data: material });
  } catch (error) {
    console.error("Error in deductRawMaterialStock:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function index(req, res) {
  try {
    const materials = await RawMaterialStock.findAll();

    const formattedMaterials = materials.map((m) => ({
      ...m.toJSON(), // Convert Sequelize instance to plain object
      lastRestockDate: utils.formattedDate(m.lastRestockDate), // Format purchaseDate
    }));

    res.status(200).json(formattedMaterials);
  } catch (error) {
    console.error("Error fetching raw materials:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = { index, upsert_RawMaterialStock, deductRawMaterialStock };
