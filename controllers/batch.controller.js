const utils = require("../functions/utils");
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
      initialProcessWeight: newBatch.currentWeight,
      processWaste: totalWaste,
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

    const formattedBatches = batches.map((bat) => ({
      ...bat.toJSON(), // Convert Sequelize instance to plain object
      startDate: utils.formattedDate(bat.startDate),
      endDate: utils.formattedDate(bat.endDate),
      BatchHistories: bat.BatchHistories.map((history) => ({
        ...history.toJSON(), // Convert each BatchHistory instance to plain object
        startedAt: utils.ist_datetime(history.startedAt),
        completedAt: utils.ist_datetime(history.completedAt),
      })),
    }));

    res.status(200).json(formattedBatches);
  } catch (error) {
    console.error("Error fetching Batches:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// Edit Batch
// Edit Batch and Update Batch History
async function editBatch(req, res) {
  function processDuration(startedAt, completedAt) {
    if (!startedAt || !completedAt) return null; // Prevents invalid calculations

    const diffMs = new Date(completedAt) - new Date(startedAt); // Difference in milliseconds
    const totalSeconds = Math.floor(diffMs / 1000); // Convert to seconds

    const hours = Math.floor(totalSeconds / 3600); // Get hours
    const minutes = Math.floor((totalSeconds % 3600) / 60); // Get minutes
    const seconds = totalSeconds % 60; // Get seconds

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  }

  try {
    const { batchId } = req.params;
    const {
      currentStatus,
      initialWeight,
      waste,
      totalWaste,
      currentWeight,
      endDate,
    } = req.body;

    const batch = await Batch.findOne({ where: { batchId } });

    if (!batch) {
      return res.status(404).json({ message: "Batch not found" });
    }

    const previousStatus = batch.currentStatus;
    const completedAt = new Date();
    //const processDuration = processDuration(startedAt, completedAt);

    const updateData = { currentStatus, totalWaste, currentWeight };

    if (endDate != null) {
      updateData.endDate = endDate; // Only add endDate if it's provided
    }

    await batch.update(updateData);

    // If status is changing, update BatchHistory
    if (currentStatus && currentStatus !== previousStatus) {
      // Mark `completedAt` for the previous status

      const previousHistory = await BatchHistory.findOne({
        where: { batchId, status: previousStatus, completedAt: null },
      });

      if (previousHistory) {
        const startedAt = previousHistory.startedAt;
        const completedAt = new Date();
        const duration = processDuration(startedAt, completedAt);

        await BatchHistory.update(
          {
            completedAt,
            processDuration: duration,
            currentWeight: initialWeight,
            processWaste: waste,
          },
          { where: { batchId, status: previousStatus, completedAt: null } }
        );
      }

      await BatchHistory.create({
        initialWeight: batch.initialWeight,
        initialProcessWeight: currentWeight,
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
//Hello
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
