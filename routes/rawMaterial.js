const express = require("express");
const rawMaterialController = require("../controllers/rawMaterial.controller");
const verifyToken = require("../middleware");
const router = express.Router();

router.get("/", verifyToken, rawMaterialController.index);
router.post("/addRawMaterial", rawMaterialController.addRawMaterial);
router.patch("/:materialId", rawMaterialController.editRawMaterial);
router.delete("/:materialId", rawMaterialController.deleteRawMaterial);

module.exports = router;
