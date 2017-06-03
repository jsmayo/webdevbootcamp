var express = require("express");
var app = express();
var bodyParser = require("body-parser");
//need this for forms

app.use(bodyParser.urlencoded({extended: true}));
//need this to tell node to use the body parser

app.set("view engine", "ejs");
//tell node to expect all filenames to end with ejs

var friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.get("/", function(req, res) {
    res.render("home");
    //render the homepage
});

app.post("/addfriend", function(req, res) {
    //console.log(req.body) //this gives you {newFriend: 'value inside input'}
    var newFriend = req.body.newFriend;
    friends.push(newFriend);
    //push the new friend into the friends array
    res.redirect("/friends"); //redirect to the page that's passed in.
});

app.get("/friends", function(req, res) {
    res.render("friends", {friends: friends});
    //make an html page "friends.ejs" by replacing the variable friends with this friends variable
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server started");
});