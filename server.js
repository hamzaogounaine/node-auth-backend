const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./Routes/authRoutes");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());

//auth routes
app.use(authRoutes);

//mongodb connect
const mongodb_uri = process.env.MONGODB_URI;
mongoose
  .connect(mongodb_uri)
  .then(() => {
    console.log("Connected to mongodb");
    app.listen(4000, () => {
      console.log("Server is running");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
  
