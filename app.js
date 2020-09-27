const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const port = 8000;
// mongoose.connect('mongodb://localhost/ContactMusic', { useNewUrlParser: true });
mongoose.connect('mongodb://localhost/ContactMusic', { useNewUrlParser: true, useUnifiedTopology: true });
// Define Mongoose Schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    url: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactSchema);

// EXPRESS RELATED STUFF
app.use("/static", express.static("static")); // For serving static files
app.use(express.urlencoded({ extended: true })); // Fetches web data
// app.use(favicon, {__dirname,"/static/1.png"});

// PUG RELATED STUFF
app.set("view engine", "pug"); // Set the engine as pug
app.set("views", path.join(__dirname, "views")); //Set the views directory

// ENDPOINTS
app.get("/", (req, res) => {
    const params = { "title": "tmcofficialmusic" };
    res.status(200).render("home.pug", params);
});

app.get("/contact", (req, res) => {
    const params = { "title": "tmcofficialmusic" };
    res.status(200).render("contact.pug", params);
});

app.post("/contact", (req, res) => {

    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render("contact.pug", params);
});

// STARTS THE SERVER
app.listen(port, () => {
    console.log(`The server has started successfully at port ${port}`);
});