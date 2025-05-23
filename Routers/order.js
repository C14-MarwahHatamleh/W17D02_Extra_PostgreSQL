const express = require('express');

const orderRouter = express.Router();

const { CreateOrder , UpdateShippingStatus} = require('../controllers/orders');


orderRouter.post("/" , CreateOrder);
orderRouter.put("/:id" , UpdateShippingStatus);


module.exports = orderRouter;
