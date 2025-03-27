const { Batch, BatchHistory } = require("../models");

// Add Batch
async function addBatch(req, res) {
  try {
    const {
      bomName, //selected bom name
      initialWeight, // Intial weight from the BOM
      employeeCount, // number of employees working in the batch
      startDate, //batch startdata
      currentStatus, //selected status
    } = req.body;

    // Create a new batch
    const newBatch = await Batch.create({
      bomName,
      initialWeight,
      currentWeight: initialWeight,
      employeeCount,
      currentStatus,
      startDate,
    });

    newBatch.batchId = `BAT${newBatch.id.toString()}`;

    await newBatch.save();

    // Create a corresponding batch history
    await BatchHistory.create({
      batchId: newBatch.batchId,
      initialWeight: newBatch.initialWeight,
      status: "Started",
      startedAt: startDate,
    });

    return res
      .status(201)
      .json({ message: "Batch created successfully", data: newBatch });
  } catch (error) {
    console.error("Error creating Batch:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get All Batches with Batch History
async function index(req, res) {
  try {
    const batches = await Batch.findAll({
      include: {
        model: BatchHistory,
      },
    });

    res.status(200).json(batches);
  } catch (error) {
    console.error("Error fetching Batches:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Edit Batch
async function editBatch(req, res) {
  try {
    const { batchId } = req.params;

    const batch = await Batch.findOne({ where: { batchId } });

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    // Update only the provided fields
    await batch.update(req.body);

    return res
      .status(200)
      .json({ message: "Batch updated successfully", data: batch });
  } catch (error) {
    console.error("Error updating Batch:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Delete Batch
async function deleteBatch(req, res) {
  try {
    const { batchId } = req.params;

    const batch = await Batch.findOne({ where: { batchId } });

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    await Batch.destroy({ where: { batchId } });
    await BatchHistory.destroy({ where: { batchId } });

    return res.status(200).json({ message: "Batch deleted successfully" });
  } catch (error) {
    console.error("Error deleting Batch:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { index, addBatch, editBatch, deleteBatch };
