const express = require('express');

const orderRouter = express.Router();

const { CreateOrder , UpdateShippingStatus , GetAllOrdersSorted} = require('../controllers/orders');


orderRouter.post("/" , CreateOrder);
orderRouter.put("/:id" , UpdateShippingStatus);
orderRouter.get("/sorted_orders" , GetAllOrdersSorted);



module.exports = orderRouter;
