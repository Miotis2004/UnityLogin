const express = require('express');
const keys = require('./config/keys.js');

const app  = express();

const mongoose = require('mongoose');
mongoose.connect(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true});

//Routes
app.get("/auth", async (req, res) => {
    res.send("Hello World! " + Date.now());
});

app.listen(keys.port, () => {
    console.log("Listening on " + keys.port.toString());
})