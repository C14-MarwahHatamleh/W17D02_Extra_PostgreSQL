const express = require('express');

const orderRouter = express.Router();

const { CreateOrder } = require('../controllers/orders');


orderRouter.post("/" , CreateOrder);


module.exports = orderRouter;
