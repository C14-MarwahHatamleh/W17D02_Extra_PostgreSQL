const express = require("express");
const pool = require("../models/db");
const pg = require("pg");

const CreateOrder = (req, res) => {
  const { shipping_status, user_id } = req.body;

  pool
    .query(`INSERT INTO orders (shipping_status , user_id) VALUES ($1 , $2) RETURNING *`, [
      shipping_status,
      user_id,
    ])
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

module.exports = {CreateOrder};
