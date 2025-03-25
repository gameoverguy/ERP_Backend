const { BOM, RawMaterial, BOMRawMaterials } = require("../models");

// Add BOM
async function addBOM(req, res) {
  try {
    const {
      bomName,
      rawMaterials, // an object containing 0 - many rawmaterials
    } = req.body;

    // Create BOM Entry Without bomId
    const newBOM = await BOM.create({ bomName });
    newBOM.bomId = `BM${newBOM.id.toString()}`;

    // Calculate Total Weight
    const totalQuantity = rawMaterials.reduce(
      (acc, rm) => acc + rm.quantity,
      0
    );
    newBOM.totalWeight = totalQuantity;

    await newBOM.save();

    // Link BOM with Raw Materials
    const bomMaterials = rawMaterials.map((rm) => ({
      bomId: newBOM.bomId,
      materialId: rm.materialId,
      quantity: rm.quantity,
    }));

    await BOMRawMaterials.bulkCreate(bomMaterials);

    return res
      .status(201)
      .json({ message: "BOM created successfully", data: newBOM });
  } catch (error) {
    console.error("Error creating BOM:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get All BOMs
async function index(req, res) {
  try {
    const boms = await BOM.findAll({
      include: {
        model: RawMaterial,
        through: { attributes: ["quantity"] },
        attributes: ["materialId", "materialName"],
      },
    });

    const formattedBOMs = boms.map((bom) => ({
      bomId: bom.bomId,
      bomName: bom.bomName,
      RawMaterials: bom.RawMaterials.map((material) => ({
        materialId: material.materialId,
        materialName: material.materialName,
        quantity: material.BOMRawMaterials.quantity,
      })),
      totalWeight: bom.totalWeight,
    }));

    res.status(200).json(formattedBOMs);
  } catch (error) {
    console.error("Error fetching BOMs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Edit BOM
async function editBOM(req, res) {
  try {
    const { bomId } = req.params;

    const {
      bomName,
      rawMaterials, // an object containing 0 - many rawmaterials
    } = req.body;

    const bom = await BOM.findOne({ where: { bomId } });

    if (!bom) {
      return res.status(404).json({ message: "BOM not found" });
    }

    // Update BOM Name if provided
    if (bomName) {
      bom.bomName = bomName;
      await bom.save();
    }

    // Update Raw Materials if provided
    if (rawMaterials && rawMaterials.length > 0) {
      const totalQuantity = rawMaterials.reduce(
        (acc, rm) => acc + rm.quantity,
        0
      );
      bom.totalWeight = totalQuantity;
      await bom.save();

      // Delete old associations
      await BOMRawMaterials.destroy({ where: { bomId } });

      // Create new associations
      const bomMaterials = rawMaterials.map((rm) => ({
        bomId: bom.bomId,
        materialId: rm.materialId,
        quantity: rm.quantity,
      }));
      await BOMRawMaterials.bulkCreate(bomMaterials);
    }

    return res
      .status(200)
      .json({ message: "BOM updated successfully", data: bom });
  } catch (error) {
    console.error("Error updating BOM:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Delete BOM
async function deleteBOM(req, res) {
  try {
    const { bomId } = req.params;

    const bom = await BOM.findOne({ where: { bomId } });

    if (!bom) {
      return res.status(404).json({ message: "BOM not found" });
    }

    await BOMRawMaterials.destroy({ where: { bomId } });
    await bom.destroy();

    return res.status(200).json({
      message: "BOM and associated raw materials deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting BOM:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { index, addBOM, editBOM, deleteBOM };
