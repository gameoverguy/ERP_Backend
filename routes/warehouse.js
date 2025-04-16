const express = require("express");
const warehouseController = require("../controllers/warehouse.controller");
const router = express.Router();

router.get("/", warehouseController.index);
router.post("/addwarehouse", warehouseController.addWarehouse);

module.exports = router;
