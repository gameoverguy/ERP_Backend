const express = require("express");
const purchaseController = require("../controllers/purchase.controller");
const router = express.Router();

router.get("/", purchaseController.index);
router.post("/addPurchase", purchaseController.addPurchase);

module.exports = router;
