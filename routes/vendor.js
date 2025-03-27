const express = require("express");
const vendorController = require("../controllers/vendor.controller");
const router = express.Router();

router.get("/", vendorController.index);
router.post("/addVendor", vendorController.addVendor);
router.patch("/:vendorId", vendorController.editVendor);
router.delete("/:vendorId", vendorController.deleteVendor);

module.exports = router;
