const express = require("express");
const finishedProductController = require("../controllers/finishedProduct.controller");
const router = express.Router();

router.get("/", finishedProductController.index);
router.post(
  "/upsert_FinishedProduct",
  finishedProductController.upsert_FinishedProduct
);
router.patch(
  "/deduct_FinishedProduct",
  finishedProductController.deduct_FinishedProduct
);

module.exports = router;
