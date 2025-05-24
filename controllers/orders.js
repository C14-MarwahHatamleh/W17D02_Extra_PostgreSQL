const express = require("express");
const pool = require("../models/db");
const pg = require("pg");

const CreateOrder = (req, res) => {
  const { shipping_status, user_id } = req.body;

  pool
    .query(
      `INSERT INTO orders (shipping_status , user_id) VALUES ($1 , $2) RETURNING *`,
      [shipping_status, user_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Order added successfully",
        orders: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    });
};

const UpdateShippingStatus = (req, res) => {
  const { id } = req.params;
  const { shipping_status } = req.body;
  const time = new Date().toISOString();

  pool
    .query(
      `UPDATE orders SET shipping_status = $1 , shipping_date = $2 WHERE id = $3 RETURNING *`,
      [shipping_status, time, id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "The shipping status has been updated successfully",
        orders: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

const GetAllOrdersSorted = (req, res) => {
  pool
    .query(
      `SELECT COUNT(orders.user_id) AS orders ,  users.firstName from orders FULL OUTER JOIN users
       ON orders.user_id = users.id 
      WHERE shipping_status  = 'completed' GROUP BY orders.user_id , users.firstName ORDER BY orders DESC`
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Get All orders for Users and ordered as DESC",
        orders: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

const DeleteOrdersByShippingStatus = async (req, res) => {
  const { id } = req.params;
  const ShippingStatus = `SELECT shipping_status FROM orders WHERE id = $1`;
  const result = await pool.query(ShippingStatus, [id]);

  if (result.rows[0].shipping_status === "completed") {
    const OrderHardDeleteOrder = `UPDATE  orders  SET is_deleted  = $1 WHERE id = $2 RETURNING *`;
    const result = await pool.query(OrderHardDeleteOrder, [1, id]);
    if (result) {
      res.status(200).json({
        success: true,
        message: "The is_deleted has been updated for Order ",
        orders: result.rows,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    }
  } else if (result.rows[0].shipping_status === "pending") {
    const OrderHardDeleteOrder = `DELETE FROM orders WHERE id = $1 RETURNING *`;
    const result = await pool.query(OrderHardDeleteOrder, [id]);
    if (result) {
      res.status(200).json({
        success: true,
        message: "The Order has been deleted ",
        orders: result.rows,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    }
  }
  //console.log(result.rows[0].shipping_status);
};

const GetAllTopUsersByTotalPrice = (req, res) => {
  pool
    .query(
      `SELECT users.firstName ,products.price * order_items.quantity AS total_price  from order_items 
     INNER JOIN products ON order_items.product_id = products.id INNER JOIN orders ON order_items.order_id = orders.id INNER JOIN users ON users.id = orders.user_id ORDER BY total_price DESC LIMIT 3`
    )
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "The Order has been deleted ",
        orders: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });
    });
};

module.exports = {
  CreateOrder,
  UpdateShippingStatus,
  GetAllOrdersSorted,
  DeleteOrdersByShippingStatus,
  GetAllTopUsersByTotalPrice
};
