const express = require("express");
const pool = require("../models/db");
const pg = require("pg");

const CreateOrderItems = (req, res) => {
  const { quantity, order_id, product_id } = req.body;

  pool
    .query(
      `INSERT INTO order_items (quantity ,order_id ,product_id) VALUES ($1 , $2  ,$3) RETURNING *`,
      [quantity, order_id, product_id]
    )
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "order items added successfully",
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

const UpdateQuantity = (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;
  pool
    .query(`UPDATE order_items SET quantity = $1 WHERE id = $2 RETURNING *`, [
      quantity,
      id,
    ])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "The quantity has been updated successfully",
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

const DeleteOrderItem = (req, res) => {
  const { id } = req.params;

  pool
    .query(`DELETE FROM order_items WHERE id = $1 RETURNING *`, [id])
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "The order items has been deleted successfully",
        orders: result.rows,
      });
    })
    .catch((err) => {res.status(500).json({
        success: false,
        message: "Server Error",
        err: err.message,
      });});
};

module.exports = { CreateOrderItems, UpdateQuantity , DeleteOrderItem};
