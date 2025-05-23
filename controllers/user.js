const express = require("express");
const pool = require("../models/db");
const pg = require("pg");

const register = (req, res) => {
  const { firstName , lastName , age ,country , email, password } = req.body;
  const value = [firstName , lastName , age ,country , email, password];
  const query = `INSERT INTO users ( firstName , lastName , age ,country , email, password) VALUES ($1,$2,$3 , $4 , $5 , $6) RETURNING *;`;
  pool
    .query(query, value)
    .then((result) => {
      if (result.rows.length) {
        return res.status(200).json({
          success: true,
          massage: "Account Created Successfully",
          result: result.rows,
        });
      }
      throw Error;
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        massage: "The name already exists",
        err,
      });
    });
};

module.exports = { register };
