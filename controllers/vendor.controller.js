const { Vendor } = require("../models");

// Add Vendor
async function addVendor(req, res) {
  try {
    const {
      vendorName,
      registrationNumber,
      gstNumber,
      website,
      email,
      contactNumber,
      address,
      bankName,
      bankBranch,
      bankAccountNumber,
      ifsc,
      micr,
    } = req.body;

    const newVendor = await Vendor.create({
      vendorName,
      registrationNumber,
      gstNumber,
      website,
      email,
      contactNumber,
      address,
      bankName,
      bankBranch,
      bankAccountNumber,
      ifsc,
      micr,
    });

    newVendor.vendorId = `V${newVendor.id.toString()}`;
    await newVendor.save();

    return res
      .status(201)
      .json({ message: "Vendor created successfully", data: newVendor });
  } catch (error) {
    console.error("Error creating vendor:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get All Vendors
async function index(req, res) {
  try {
    const vendors = await Vendor.findAll();
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

// Edit Vendor
async function editVendor(req, res) {
  try {
    const { vendorId } = req.params;
    const updatedData = req.body;

    const vendor = await Vendor.findOne({ where: { vendorId } });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    await vendor.update(updatedData);

    return res
      .status(200)
      .json({ message: "Vendor updated successfully", data: vendor });
  } catch (error) {
    console.error("Error updating vendor:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Delete Vendor
async function deleteVendor(req, res) {
  try {
    const { vendorId } = req.params;

    const vendor = await Vendor.findOne({ where: { vendorId } });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    await vendor.destroy();

    return res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { index, addVendor, editVendor, deleteVendor };
