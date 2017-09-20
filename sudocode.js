// 'use strict';
//
// const express = require("express");
// const mongoose = require("mongoose");
// const Shoes = require("../models/shoes");
// const router = express.Router();
//
// // GET request for all the shoes in the database
// // description: return all the shoes in the database
// router.get("/shoes", function(req, res) {
//   Shoes.find({}).then(function(result) {
//       res.json(result);
//     }).catch(function(err) {
//       return next(err);
//     });
// });
//
// // GET request for specific shoe brand in the database
// // description: return only for a specified shoe brand
// router.get("/shoes/brand/:brand", function(req, res) {
//   const brand = req.params.brand;
//   Shoes.find({
//       brand: brand
//     }).then(function(result) {
//       res.json(result)
//     }).catch(function(err) {
//       return next(err);
//     });
// });
//
// // GET request for specific shoe size in the database
// // description: return only for specified shoe size
// router.get("/shoes/size/:size", function(req, res) {
//   const size = req.params.size;
//   Shoes.find({
//       size: size
//     }).then(function(result) {
//       res.json(result)
//     }).catch(function(err) {
//       return next(err);
//     });
// });
//
// // GET request for specific size and brand in the database
// // description: return only for specified shoe size and brand
// router.get("/shoes/brand/:brand/size/:size", function(req, res) {
//   const brand = req.params.brand;
//   const size = req.params.size;
//   Shoes.find({
//       brand: brand,
//       size: size
//     }).then(function(result) {
//       res.json(result)
//     }).catch(function(err) {
//       return next(err);
//     });
// });
//
// // POST request to add more shoes to the stock
// // description: add new shoe to the stock
// router.post("/shoes", function(req, res) {
//   const newItem = req.body;
//   const newShoe = new Shoes(newItem);
//   newShoe.save().then(function() {
//     Shoes.find({}).then(function(result) {
//       res.json(result);
//     }).catch(function(err) {
//       return next(err);
//     });
//   });
// });
//
// // GET request by _id
// // description: get shoe from database using the shoe _id
// router.get("/shoes/id/:id", function(req, res) {
//   const id = req.params.id;
//   Shoes.find({
//       _id: id
//     }).then(function(result) {
//       res.json(result)
//     }).catch(function(err) {
//       return next(err);
//     });
// });
//
// // POST request for when a shoe is sold
// // description: update the database by decrementing by the AMOUNT the shoe sold searched by the brand and size
// router.post("/shoes/sold/id/:id/amount/:amount", function(req, res) {
//   const id = req.params.id;
//   const amount = req.params.amount;
//   Shoes.findOneAndUpdate({
//       _id: id
//     }, {
//       $inc: {
//         in_stock: -amount
//       }
//     }).then(function(result) {
//       res.json(result)
//     }).catch(function(err) {
//       return next(err);
//     });
// });
//
// // UPDATE request for when a shoe that already exists is being added
// // description: update the database by incrementing by the AMOUNT the shoe is being updated
// router.post("/shoes/id/:id/amount/:amount", function(req, res) {
//   const id = req.params.id;
//   const amount = req.params.amount;
//   Shoes.findOneAndUpdate({
//       _id: id
//     }, {
//       $inc: {
//         in_stock: amount
//       }
//     }).then(function(result) {
//       res.json(result)
//     }).catch(function(err) {
//       return next(err);
//     });
// });
//
// module.exports = router;
