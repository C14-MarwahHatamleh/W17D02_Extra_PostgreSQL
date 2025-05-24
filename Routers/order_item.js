const express = require("express");

const orderItemsRouter = express.Router();

const {
  CreateOrderItems,
  UpdateQuantity,
  DeleteOrderItem,
  RetrieveAllOrderItemsByUser,
  GetOrderItemsByPriceOrdered,
  GetAllPopularProductIdCompleted,
  GetBestProductByTotalPrice
} = require("../controllers/order_item");

orderItemsRouter.post("/", CreateOrderItems);
orderItemsRouter.put("/:id", UpdateQuantity);
orderItemsRouter.delete("/:id", DeleteOrderItem);
orderItemsRouter.get("/:user_id", RetrieveAllOrderItemsByUser);
orderItemsRouter.get("/order/totalPrice", GetOrderItemsByPriceOrdered);
orderItemsRouter.get("/completed/productId", GetAllPopularProductIdCompleted);
orderItemsRouter.get("/completed/product", GetBestProductByTotalPrice);



module.exports = orderItemsRouter;
