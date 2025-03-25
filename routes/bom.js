const express = require("express");
const bomController = require("../controllers/bom.controller");
const router = express.Router();

router.get("/", bomController.index);
router.post("/addBOM", bomController.addBOM);
router.patch("/:bomId", bomController.editBOM);
router.delete("/:bomId", bomController.deleteBOM);

module.exports = router;
