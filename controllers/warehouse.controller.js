const { Warehouse } = require("../models");

// Add Vendor
async function addWarehouse(req, res) {
  try {
    const {
      warehouseName,
      locationType,
      address,
      contactPerson,
      contactNumber,
      status,
    } = req.body;

    const newWarehouse = await Warehouse.create({
      warehouseName,
      locationType,
      address,
      contactPerson,
      contactNumber,
      status,
    });

    newWarehouse.warehouseId = `WH${newWarehouse.id.toString()}`;
    await newWarehouse.save();

    return res
      .status(201)
      .json({ message: "Warehouse created successfully", data: newWarehouse });
  } catch (error) {
    console.error("Error creating Warehouse:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get All Vendors
async function index(req, res) {
  try {
    const Warehouses = await Warehouse.findAll();
    res.status(200).json(Warehouses);
  } catch (error) {
    console.error("Error fetching Warehouses:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// // Edit Vendor
// async function editVendor(req, res) {
//   try {
//     const { vendorId } = req.params;
//     const updatedData = req.body;

//     const vendor = await Vendor.findOne({ where: { vendorId } });

//     if (!vendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }

//     await vendor.update(updatedData);

//     return res
//       .status(200)
//       .json({ message: "Vendor updated successfully", data: vendor });
//   } catch (error) {
//     console.error("Error updating vendor:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

// // Delete Vendor
// async function deleteVendor(req, res) {
//   try {
//     const { vendorId } = req.params;

//     const vendor = await Vendor.findOne({ where: { id: vendorId } });

//     if (!vendor) {
//       return res.status(404).json({ message: "Vendor not found" });
//     }

//     await vendor.destroy();

//     return res.status(200).json({ message: "Vendor deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting vendor:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// }

module.exports = { index, addWarehouse };
