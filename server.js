const express = require("express");
const path = require("path");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose")
app.use(express.json()); // built-in body-parser

app.get("/", (req, res) => {
    res.json({"message": "API Listening"})
})