const utils = require("../functions/utils");
const {
  StockTransferOrder,
  StockTransferItem,
  FinishedProduct,
  sequelize,
} = require("../models");

// Step 1: Create Stock Transfer Order & Deduct Stock from Source
const createStockTransferOrder = async (req, res) => {
  const {
    source_warehouse_id,
    destination_warehouse_id,
    dispatch_date,
    vehicle_number,
    driver_name,
    items,
  } = req.body;

  const t = await sequelize.transaction();
  try {
    // First, create the order to get an auto-increment ID
    const order = await StockTransferOrder.create(
      {
        source_warehouse_id,
        destination_warehouse_id,
        dispatch_date,
        vehicle_number,
        driver_name,
        status: "pending",
      },
      { transaction: t }
    );

    // Generate stockTransferOrderNumber using STO + ID
    const stockTransferOrderNumber = `STO${order.id}`;
    order.stockTransferOrderNumber = stockTransferOrderNumber;
    await order.save({ transaction: t });

    // Create items and deduct stock
    for (const item of items) {
      const { batchNumber, productName, packet_size, quantity } = item;

      await StockTransferItem.create(
        {
          stockTransferOrderNumber,
          batchNumber,
          productName,
          packet_size,
          quantity,
        },
        { transaction: t }
      );

      const sourceProduct = await FinishedProduct.findOne({
        where: {
          warehouseId: source_warehouse_id,
          productName,
          batchId: batchNumber,
        },
        transaction: t,
      });

      if (!sourceProduct || (sourceProduct[packet_size] || 0) < quantity) {
        await t.rollback();
        return res.status(400).json({
          message: `Insufficient stock for ${productName} (${packet_size}) in source warehouse.`,
        });
      }

      sourceProduct[packet_size] -= quantity;
      await sourceProduct.save({ transaction: t });
    }

    await t.commit();
    res.status(201).json({
      message: "Stock transfer order created.",
      stockTransferOrderNumber,
      orderId: order.id,
    });
  } catch (err) {
    await t.rollback();
    res.status(500).json({
      message: "Error creating stock transfer order.",
      error: err.message,
    });
  }
};

// Step 2: Receive Transfer & Add Stock to Destination
const receiveStockTransfer = async (req, res) => {
  const { stockTransferOrderNumber } = req.params;

  const t = await sequelize.transaction();
  try {
    const order = await StockTransferOrder.findOne({
      where: { stockTransferOrderNumber },
      include: [{ model: StockTransferItem }],
      transaction: t,
    });

    if (!order) {
      await t.rollback();
      return res
        .status(404)
        .json({ message: "Stock transfer order not found." });
    }

    if (order.status === "received") {
      await t.rollback();
      return res
        .status(400)
        .json({ message: "Transfer already marked as received." });
    }

    const { destination_warehouse_id } = order;

    for (const item of order.StockTransferItems) {
      const { batchNumber, productName, packet_size, quantity } = item;

      const [destProduct] = await FinishedProduct.findOrCreate({
        where: {
          warehouseId: destination_warehouse_id,
          productName,
          batchId: batchNumber,
        },
        defaults: {
          warehouseName: "Destination Warehouse",
        },
        transaction: t,
      });

      destProduct[packet_size] = (destProduct[packet_size] || 0) + quantity;
      await destProduct.save({ transaction: t });
    }

    order.status = "received";
    order.received_date = new Date();
    await order.save({ transaction: t });

    await t.commit();
    res.status(200).json({ message: "Stock transfer received successfully." });
  } catch (err) {
    await t.rollback();
    res
      .status(500)
      .json({ message: "Error receiving stock transfer.", error: err.message });
  }
};

const getAllStockTransfers = async (req, res) => {
  try {
    const orders = await StockTransferOrder.findAll({
      include: {
        model: StockTransferItem,
      },
    });

    const formattedOrders = orders.map((order) => ({
      ...order.toJSON(),
      dispatch_date: utils.ist_datetime(order.dispatch_date),
      received_date: utils.ist_datetime(order.received_date),
      StockTransferItems: order.StockTransferItems.map((item) => ({
        ...item.toJSON(),
      })),
    }));

    res.status(200).json(formattedOrders);
  } catch (error) {
    console.error("Error fetching stock transfers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createStockTransferOrder,
  receiveStockTransfer,
  getAllStockTransfers,
};

// {
//   "source_warehouse_id": "WH10001",
//   "destination_warehouse_id": "WH10002",
//   "dispatch_date": "2025-04-18",
//   "vehicle_number": "TN38BT1234",
//   "driver_name": "Ravi",
//   "items": [
//     {
//       "batchNumber": "BAT10005",
//       "productName": "Wheat_flour",
//       "packet_size": "100g",
//       "quantity": 50
//     },
//     {
//       "batchNumber": "BAT10004",
//       "productName": "chilliPowder_grade_A",
//       "packet_size": "500g",
//       "quantity": 30
//     }
//   ]
// }
