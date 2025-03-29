//const { where } = require("sequelize");
const utils = require("../functions/utils");
const { FinishedProduct } = require("../models");

// Add or Update Finished Product Stock
async function upsert_FinishedProduct(req, res) {
  try {
    console.log(req.body);

    const { batchId, productName, sizes, mfdDate, expDate } = req.body;

    // Check if product with the given batchId exists
    let product = await FinishedProduct.findOne({ where: { batchId } });

    if (product) {
      // Update the existing product
      Object.keys(sizes).forEach((size) => {
        if (product[size] !== undefined) {
          product[size] += parseFloat(sizes[size]);
        }
      });

      product.mfdDate = mfdDate || product.mfdDate;
      product.expDate = expDate || product.expDate;

      await product.save();

      return res
        .status(200)
        .json({ message: "Product updated successfully", data: product });
    } else {
      // Create a new product entry
      const newProductData = {
        batchId,
        productName,
        ...sizes,
        mfdDate,
        expDate,
      };

      const newProduct = await FinishedProduct.create(newProductData);

      return res
        .status(201)
        .json({ message: "Product created successfully", data: newProduct });
    }
  } catch (error) {
    console.error("Error in upsert_FinishedProduct:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Deduct Stock from Finished Product
async function deduct_FinishedProduct(req, res) {
  try {
    const { batchId, sizes } = req.body;

    // Check if product exists
    let product = await FinishedProduct.findOne({ where: { batchId } });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Deduct sizes from product stock
    for (const size in sizes) {
      if (product[size] === undefined) {
        return res.status(400).json({ message: `Invalid size: ${size}` });
      }
      const remainingStock = product[size] - parseFloat(sizes[size]);
      if (remainingStock < 0) {
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${size}` });
      }
      product[size] = remainingStock;
    }

    await product.save();
    return res
      .status(200)
      .json({ message: "Stock deducted successfully", data: product });
  } catch (error) {
    console.error("Error in deductFinishedProduct:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Get all Finished Products
async function index(req, res) {
  try {
    const products = await FinishedProduct.findAll();

    const formattedProducts = products.map((p) => ({
      ...p.toJSON(),
      mfdDate: utils.formattedDate(p.mfdDate),
      expDate: utils.formattedDate(p.expDate),
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("Error fetching finished products:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
}

module.exports = { index, upsert_FinishedProduct, deduct_FinishedProduct };
