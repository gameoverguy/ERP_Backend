const express = require("express");
const finishedProductController = require("../controllers/finishedProduct.controller");
const router = express.Router();

router.get("/", finishedProductController.index);
router.post(
  "/upsert_RawMaterialStock",
  finishedProductController.upsert_FinishedProduct
);
router.patch(
  "/deduct_RawMaterialStock",
  finishedProductController.deductFinishedProduct
);

module.exports = router;
