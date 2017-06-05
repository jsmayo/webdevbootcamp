var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");



 var campgrounds = [
       {name: "Seagull", image: "http://domokur.com/display/images/002043_Seagull--Seafarer-15.jpg"},
       {name: "Don Lee", image: "https://nccumc.org/files/oh.jpg"},
       {name: "Seafarer", image: "https://s-media-cache-ak0.pinimg.com/originals/84/c1/10/84c110dc06841c3364fc6a1e3f596ecb.jpg"}
       ];
       
      
app.get("/", function(req, res) {
    res.render("landing");
});


app.get("/campgrounds", function(req, res) {
  
       
       res.render("campgrounds", {campgrounds: campgrounds});
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})


app.post("/campgrounds", function(req, res) {
   // get data form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    // redirect back to campgrounds page
    res.redirect("/campgrounds"); //default redirect is a GET request (basically refresh)
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started.");
});