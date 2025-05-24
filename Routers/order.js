const express = require("express");

const orderRouter = express.Router();

const {
  CreateOrder,
  UpdateShippingStatus,
  GetAllOrdersSorted,
  DeleteOrdersByShippingStatus,
  GetAllTopUsersByTotalPrice
} = require("../controllers/orders");

orderRouter.post("/", CreateOrder);
orderRouter.put("/:id", UpdateShippingStatus);
orderRouter.get("/sorted_orders", GetAllOrdersSorted);
orderRouter.delete("/:id", DeleteOrdersByShippingStatus);
orderRouter.get("/highestOrderTotalPrice", GetAllTopUsersByTotalPrice);

module.exports = orderRouter;
