// import data from './data';
// import config from './config';
// import mongoose from 'mongoose';
// import bodyParser from 'body-parser';
// import userRoute from './routes/userRoute';
// import express from 'express';
// import dotenv from 'dotenv';

const dotenv = require('dotenv')
const mongoose = require('mongoose')
const data = require('./data')
const config = require('./config')
const bodyParser = require('body-parser')
const userRoute = require('./routes/userRoute')
const express = require('express')


dotenv.config();

const app = express();
const cors = require("cors");
app.use(bodyParser.json());

app.use(cors());

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl).catch(error => console.log(error.reason));

app.use("/api/users", userRoute);
app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = data.products.find(x => x._id === productId);

  if (product) {
    res.send(product);
  } else {
   res.status(404).send({ msg: "Product Not Found" });
  }
});

app.get("/api/products", (req, res) => {
  res.send(data.products);
});

app.listen(5000, () => {
  console.log("Server started at http://localhost:5000");
});
