const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

const rawMaterialRoute = require("./routes/rawMaterial");
const bomRoute = require("./routes/bom");
const vendorRoute = require("./routes/vendor");
const purchaseRoute = require("./routes/purchase");
const rawMaterialStockRoute = require("./routes/rawMaterialStock");
const batchRoute = require("./routes/batch");
const finishedProductRoute = require("./routes/finishedProduct");
const dashboardRoute = require("./routes/dashboard");
const users = require("./routes/user");

app.use(cookieParser());
app.use(bodyParser.json());
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Your frontend URL
//     credentials: true, // Allow cookies
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",
  "http://192.168.156.59:5173",
  "http://192.168.1.13:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // If using cookies or authentication
  })
);

// app.use(
//   cors({
//     origin: "*",
//   })
// );

app.use(
  session({
    secret: "12345",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 300000 }, // 5 minutes expiry
  })
);

app.use("/rawMaterials", rawMaterialRoute);
app.use("/boms", bomRoute);
app.use("/vendors", vendorRoute);
app.use("/purchases", purchaseRoute);
app.use("/rawMaterialStock", rawMaterialStockRoute);
app.use("/batches", batchRoute);
app.use("/finishedProducts", finishedProductRoute);
app.use("/dashboard", dashboardRoute);
app.use("/users", users);

module.exports = app;
