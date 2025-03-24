const { RawMaterial, BOMRawMaterials } = require("../models");

async function addRawMaterial(req, res) {
  try {
    const { materialName, minStock } = req.body;

    const newMaterial = await RawMaterial.create({ materialName, minStock });
    newMaterial.materialId = `RM${newMaterial.id.toString()}`;
    await newMaterial.save();

    return res
      .status(201)
      .json({ message: "Material created successfully", data: newMaterial });
  } catch (error) {
    console.error("Error creating raw material:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function index(req, res) {
  try {
    const materials = await RawMaterial.findAll();
    res.status(200).json(materials);
  } catch (error) {
    console.error("Error fetching raw materials:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Edit Raw Material by materialId
async function editRawMaterial(req, res) {
  try {
    const { materialId } = req.params;
    const { materialName, minStock } = req.body;

    // Ensure materialId exists and find by materialId
    const material = await RawMaterial.findOne({ where: { materialId } });

    if (!material) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    // Update fields if provided
    if (materialName !== undefined) material.materialName = materialName;
    if (minStock !== undefined) material.minStock = minStock;

    await material.save();

    return res
      .status(200)
      .json({ message: "Raw material updated", data: material });
  } catch (error) {
    console.error("Error updating raw material:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Delete Raw Material by materialId
async function deleteRawMaterial(req, res) {
  try {
    const { materialId } = req.params;

    // Find material using materialId
    const material = await RawMaterial.findOne({ where: { materialId } });

    if (!material) {
      return res.status(404).json({ message: "Raw material not found" });
    }

    // Check if the raw material is associated with any BOM
    const associatedBOMs = await BOMRawMaterials.findOne({
      where: { materialId },
    });

    if (associatedBOMs) {
      return res.status(400).json({
        message:
          "Cannot delete raw material as it is associated with a BOM. Please update or delete the BOM first.",
      });
    }

    await material.destroy();

    return res
      .status(200)
      .json({ message: "Raw material deleted successfully" });
  } catch (error) {
    console.error("Error deleting raw material:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { index, addRawMaterial, editRawMaterial, deleteRawMaterial };
