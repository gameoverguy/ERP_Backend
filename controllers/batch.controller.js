const { Batch, BatchHistory } = require("../models");

// Add Batch
async function addBatch(req, res) {
  try {
    const {
      bomName,
      initialWeight,
      currentWeight,
      employeeCount,
      currentStatus,
      startDate,
      totalWaste,
    } = req.body;

    console.log(req.body);

    // Create a new batch
    const newBatch = await Batch.create({
      bomName,
      initialWeight,
      currentWeight,
      employeeCount,
      currentStatus,
      startDate,
      totalWaste,
    });

    newBatch.batchId = `BAT${newBatch.id.toString()}`;
    newBatch.bomName = bomName;
    newBatch.initialWeight = initialWeight;
    newBatch.currentWeight = currentWeight;
    newBatch.employeeCount = employeeCount;
    newBatch.currentStatus = currentStatus;
    newBatch.startDate = startDate;
    newBatch.totalWaste = totalWaste;

    await newBatch.save();

    // Create a corresponding batch history
    await BatchHistory.create({
      batchId: newBatch.batchId,
      initialWeight: newBatch.currentWeight,
      status: newBatch.currentStatus,
      startedAt: startDate,
      completedAt: null,
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
// Edit Batch and Update Batch History
async function editBatch(req, res) {
  function processDuration(startedAt, completedAt) {
    const date1 = new Date("2025-03-11T05:30:00");
    const date2 = new Date("2025-03-13T08:29:00"); // Adjusted to match 2d, 23h, 59m

    const diffMs = date2 - date1; // Difference in milliseconds
    const diffMinutes = Math.floor(diffMs / (1000 * 60)); // Convert to minutes

    const days = Math.floor(diffMinutes / (60 * 24)); // Extract days
    const hours = Math.floor((diffMinutes % (60 * 24)) / 60); // Extract hours
    const minutes = diffMinutes % 60; // Extract minutes

    console.log(`${days} days, ${hours} hours, ${minutes} minutes`);
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  }
  try {
    const { batchId } = req.params;
    const { currentStatus, startedAt } = req.body;

    const batch = await Batch.findOne({ where: { batchId } });

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    const previousStatus = batch.currentStatus;
    const completedAt = new Date();
    const processDuration = processDuration(startedAt, completedAt);

    // Update batch with the new status
    await batch.update({ currentStatus });

    // If status is changing, update BatchHistory
    if (currentStatus && currentStatus !== previousStatus) {
      // Mark `completedAt` for the previous status
      await BatchHistory.update(
        { completedAt: completedAt },
        { processDuration: processDuration },
        { where: { batchId, status: previousStatus, completedAt: null } }
      );

      // Insert new status entry with `startedAt`
      await BatchHistory.create({
        batchId: batch.batchId,
        status: currentStatus,
        startedAt: completedAt, // This marks when the new status begins
      });
    }

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
