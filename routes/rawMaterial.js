const express = require("express");
const rawMaterialController = require("../controllers/rawMaterial.controller");
const router = express.Router();

router.get("/", rawMaterialController.index);
router.post("/addRawMaterial", rawMaterialController.addRawMaterial);
router.patch("/:materialId", rawMaterialController.editRawMaterial);
router.delete("/:materialId", rawMaterialController.deleteRawMaterial);

module.exports = router;
