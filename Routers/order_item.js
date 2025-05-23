const express = require('express');

const orderItemsRouter = express.Router();

const {CreateOrderItems , UpdateQuantity , DeleteOrderItem} = require("../controllers/order_item");


orderItemsRouter.post("/" , CreateOrderItems)
orderItemsRouter.put("/:id" ,UpdateQuantity)
orderItemsRouter.delete("/:id" ,DeleteOrderItem)


module.exports = orderItemsRouter;
