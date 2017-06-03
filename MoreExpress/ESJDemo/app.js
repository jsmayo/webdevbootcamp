var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home"); 
    //embedded javascript
    //you need a views directory with the filename inside of it. 
});

app.get("/fallinlovewith/:thing", function(req, res) {
   var thing = req.params.thing;
  // res.send("You fell in love with " + thing);
  res.render("love", {thingVar: thing.toUpperCase()}); 
  //automatically looks in the views directory, 
  //so make love.ejs inside of the views/
  //an object is passed inside of the render call
    //thingVar = variable on the template side
    //thing = Variable in this file.
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "My First Post!", author: "Susy"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you believe this pomsky", author: "Colt"}
        ];
        
    res.render("posts", {posts: posts})
    //postTemplate, postHere
})

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is listening");
});