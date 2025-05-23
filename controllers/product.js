const express = require("express");
const pool = require("../models/db");
const pg = require("pg");

/*REVIEW*/
const addProduct = (req, res) => {
  const { title, img, category, price } = req.body;

  const values = [title, img, category, price];
  const query =
    "INSERT INTO products(title,img,category,price) VALUES($1,$2,$3,$4) RETURNING *;";

  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "product added successfully",
        product: result.rows,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        message: "an error occurred",
        err,
      });
    });
};
const getAllProducts = (req, res) => {
    const query = "SELECT * FROM products";
  
    pool
      .query(query)
      .then((result) => {
        if (result.rows.length === 0) {
          return res.status(404).json({
            success: false,
            message: "no products found",
          });
        } else {
          res.status(200).json({
            success: true,
            message: "all products",
            result: result.rows,
          });
        }
      })
      .catch((err) => {
        res.status(400).json({
          success: false,
          message: "an error occurred",
          err,
        });
      });
  };
  const updateProduct = (req, res) => {
    const product_id = req.params.product_id;

    const { title, img, category, price } = req.body;
    console.log("req.body",req.body);
    const values = [title||null, img||null, category||null, price||null];
    console.log("values",values);
    const query = `UPDATE products SET title=COALESCE($1,title),category=COALESCE($2,category),img=COALESCE($3,img),price=COALESCE($4,price) WHERE id=$5 RETURNING *;`;
    pool
    .query(query, values)
    .then((result) => {
      if (result.rows.length) {
        return res.status(201).json({
          success: true,
          massage: "Product Updated Successfully",
          result: result.rows,
        });
      }
      throw err;
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, message: "something went wrong", err });
    });


  }







  module.exports = {
    addProduct,
    getAllProducts,
    updateProduct
  };
  