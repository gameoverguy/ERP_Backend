const {
  Purchase,
  FinishedProduct,
  RawMaterial,
  RawMaterialStock,
  Batch,
  BOM,
  BatchHistory,
} = require("../models");
const utils = require("../functions/utils");

async function index(req, res) {
  try {
    const rawMaterials = await RawMaterial.findAll();

    const formattedRawMaterials = rawMaterials.map((rm) => ({
      materialName: rm.materialName,
      minStock: rm.minStock,
    }));

    const boms = await BOM.findAll({
      include: {
        model: RawMaterial,
        through: { attributes: ["quantity"] },
        attributes: ["materialId", "materialName"],
      },
    });

    const formattedBOMs = boms.map((bom) => ({
      bomName: bom.bomName,
      RawMaterials: bom.RawMaterials.map((material) => ({
        materialName: material.materialName,
        quantity: material.BOMRawMaterials.quantity,
      })),
      totalWeight: bom.totalWeight,
    }));

    const purchases = await Purchase.findAll({
      attributes: ["purchaseDate", "materialName", "weight"], // Adjust columns as needed
    });

    const formattedPurchases = purchases.map((p) => ({
      materialName: p.materialName,
      purchaseDate: utils.formattedDate(p.purchaseDate), // ✅ Now in DD-MM-YYYY format
      weight: p.weight,
    }));

    const materialStock = await RawMaterialStock.findAll();

    const formattedMaterialStock = materialStock.map((m) => ({
      materialName: m.materialName,
      currentStock: m.currentStock,
      lastRestockDate: utils.formattedDate(m.lastRestockDate),
    }));

    const batches = await Batch.findAll({
      include: {
        model: BatchHistory,
      },
    });

    const formattedBatches = batches.map((bat) => ({
      bomName: bat.bomName,
      initialWeight: bat.initialWeight,
      currentWeight: bat.currentWeight,
      totalWaste: bat.totalWaste,
      currentStatus: bat.currentStatus,
      startDate: utils.formattedDate(bat.startDate),
      endDate: utils.formattedDate(bat.endDate),

      BatchHistories: bat.BatchHistories.map((history) => ({
        batchId: history.batchId,
        status: history.status,
        processDuration: history.processDuration,
        initialProcessWeight: history.initialProcessWeight,
        processWaste: history.processWaste,
        startedAt: utils.formattedDate(history.startedAt),
        completedAt: history.completedAt
          ? utils.formattedDate(history.completedAt)
          : null,
      })),
    }));

    const finishedProducts = await FinishedProduct.findAll();

    const formattedfinishedProducts = finishedProducts.map((fp) => ({
      batchId: fp.batchId,
      "50g": fp["50g"],
      "100g": fp["100g"],
      "200g": fp["200g"],
      "500g": fp["500g"],
      productName: fp.productName,
      mfdDate: utils.formattedDate(fp.mfdDate),
      expDate: utils.formattedDate(fp.expDate),
    }));

    const dashboardStats = {
      purchaseData: formattedPurchases,
      finishedProductsData: formattedfinishedProducts,
      rawMaterialStockData: formattedMaterialStock,
      rawMaterialUnits: formattedRawMaterials,
      bomUnits: formattedBOMs,
      batchData: formattedBatches,
    };

    res.status(200).json(dashboardStats);
  } catch (error) {
    console.error("Error fetching BOMs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { index };
