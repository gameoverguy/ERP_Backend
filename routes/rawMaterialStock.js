const express = require("express");
const rawMaterialStockController = require("../controllers/rawMaterialStock.controller");
const router = express.Router();

router.get("/", rawMaterialStockController.index);
router.post(
  "/upsert_RawMaterialStock",
  rawMaterialStockController.upsert_RawMaterialStock
);
router.patch(
  "/deduct_RawMaterialStock",
  rawMaterialStockController.deductRawMaterialStock
);

module.exports = router;
