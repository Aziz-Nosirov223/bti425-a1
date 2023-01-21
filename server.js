/*********************************************************
 * BTI425 - Assignment 1
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 * 
 * Name: Aziz Nosirov   Student ID : 115673188      Date: Jan 20 2023
 * Cyclic link: 
 */

const express = require("express");
const path = require("path");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose")
app.use(express.json()); // built-in body-parser
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});



app.get("/", (req, res) => {
    res.json({"message": "API Listening"})
})

app.post("/api/movies", (req, res) => {
    //res.status(201).json(dataService.addNewStudent(req.body)) from inclass assignment
    res.status(201).json(db.addNewMovie(req.body))
})



app.get("/api/movies", (req, res) => {

    let page = req.query.page ? req.query.page : 0

    let perPage = req.query.perPage ? req.query.perPage : 0
    let title = req.query.title ? req.query.title : 0
 //   db.getAllMovies()





    db.getAllMovies(page, perPage, title)
    .then((data) => {
        data ? res.status(200).json(data) : res.status(404).json({"message": "Resource not found"})
    })
    .catch((err) => {
        res.status(500).json({"message": "Server internal error"})
    })
//    res.status(200).json(db.getAllMovies(req.params.page, req.params.perPage, req.params.title))
})

app.get("/api/movies/:id", (req, res) => {
    db.getMovieById(req.params.id)
    .then((data) => {
        data ? res.json(data) : res.status(404).json({"message": "Resource not found"})
    })
    .catch((err) => {
        res.status(500).json({"message": "Server internal error"})
    })
//    res.status(200).json(db.getMovieById(req.params.id))
})

app.put("/api/movies/:id", (req, res) => {
    let o = db.updateMovieById(req.body, req.params.id)
    o ? res.status(200).json(o) : res.status(400).json({"message": "error 404"})
})

app.delete("/api/movies/:id", (req, res) => {
    db.deleteMovieById(req.params.id)
    res.status(204).end()
})