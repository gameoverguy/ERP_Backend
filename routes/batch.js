const express = require("express");
const batchController = require("../controllers/batch.controller");
const router = express.Router();

router.get("/", batchController.index);
router.post("/addBatch", batchController.addBatch);
router.put("/:batchId", batchController.editBatch);
router.delete("/:batchId", batchController.deleteBatch);

module.exports = router;
