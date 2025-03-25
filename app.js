const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

const rawMaterialRoute = require("./routes/rawMaterial");
const bomRoute = require("./routes/bom");
const vendorRoute = require("./routes/vendor");
const purchaseRoute = require("./routes/purchase");
const rawMaterialStockRoute = require("./routes/rawMaterialStock");
const batchRoute = require("./routes/batch");
const finishedProductRoute = require("./routes/finishedProduct");

app.use(bodyParser.json());
app.use(cors());

app.use("/rawMaterials", rawMaterialRoute);
app.use("/boms", bomRoute);
app.use("/vendors", vendorRoute);
app.use("/purchases", purchaseRoute);
app.use("/rawMaterialStock", rawMaterialStockRoute);
app.use("/batches", batchRoute);
app.use("/finishedProducts", finishedProductRoute);

module.exports = app;
