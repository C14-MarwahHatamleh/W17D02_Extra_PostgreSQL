const express = require("express");

const orderItemsRouter = express.Router();

const {
  CreateOrderItems,
  UpdateQuantity,
  DeleteOrderItem,
  RetrieveAllOrderItemsByUser,
  GetOrderItemsByPriceOrdered
} = require("../controllers/order_item");

orderItemsRouter.post("/", CreateOrderItems);
orderItemsRouter.put("/:id", UpdateQuantity);
orderItemsRouter.delete("/:id", DeleteOrderItem);
orderItemsRouter.get("/:user_id", RetrieveAllOrderItemsByUser);
orderItemsRouter.get("/order/totalPrice", GetOrderItemsByPriceOrdered);



module.exports = orderItemsRouter;
