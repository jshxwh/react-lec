const express = require("express");

const app = express();
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");
const products = require("./routes/product");
const errorMiddleware = require("./middlewares/error");
const order = require("./routes/order");

app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());
// app.use(fileUpload());

app.use("/api/v1", products);
app.use("/api/v1", auth);
app.use("/api/v1", order);
app.use(errorMiddleware);

module.exports = app;
