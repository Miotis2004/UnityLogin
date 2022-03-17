const express = require('express');

const app  = express();

//Routes
app.get("/auth", async (req, res) => {
    res.send("Hello World! " + Date.now());
});

const port = 13756;
app.listen(port, () => {
    console.log("Listening on " + port.toString());
})