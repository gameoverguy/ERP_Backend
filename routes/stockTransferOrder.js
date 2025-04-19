const express = require("express");
const router = express.Router();
const controller = require("../controllers/stockTransferOrder.controller");

router.post("/create", controller.createStockTransferOrder);
router.post(
  "/receive/:stockTransferOrderNumber",
  controller.receiveStockTransfer
);
router.get("/", controller.getAllStockTransfers);

module.exports = router;
