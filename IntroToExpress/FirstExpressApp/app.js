var express = require("express");
var app = express();
var cat = require("cat-me");
var joke = require("knock-knock-jokes");


// "/" => "Hi there"
app.get("/", function(req, res) {
    //req = request and res = response
    res.send("Hi there!");
});

app.get("/bye", function(req, res) {
    //req = request and res = response
    res.send("Goodbye!");
});

app.get("/joke", function(req, res) {
    //req = request and res = response
    res.send(joke());
});

app.get("/cat", function(req, res) {
    //req = request and res = response
    res.send(cat());
});

//This needs to be last, since it is a catch all and routes are first-match
app.get("*", function(req, res) {
    //req = request and res = response
    //this gives you the following whenever you go to an undefined route
    res.send("You are a star!");
});

// Need to tell the server to listen:
app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server initiated");
});
//This is the environment variable and IP for cloud 9

