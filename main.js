require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());

const userRouter = require("./Routers/users");
const productRouter = require("./Routers/products");
const orderRouter = require("./Routers/order");
const orderItemsRouter = require("./Routers/order_item");

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);
app.use("/order_items", orderItemsRouter);

app.listen(5000, () => {
  console.log("Server Running");
});
