var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//create the Schema/Pattern
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
})

//compile the model 
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {name: "Don Lee", 
//     image: "https://nccumc.org/files/oh.jpg"}, 
//     function(err, campground) {
//         if(err) console.log(err);
//         else console.log("new campground " + campground);
    
//     });

//  var campgrounds = [
//       {name: "Seagull", image: "http://domokur.com/display/images/002043_Seagull--Seafarer-15.jpg"},
//       {name: "Don Lee", image: "https://nccumc.org/files/oh.jpg"},
//       {name: "Seafarer", image: "https://s-media-cache-ak0.pinimg.com/originals/84/c1/10/84c110dc06841c3364fc6a1e3f596ecb.jpg"}
//       ];
       
      
app.get("/", function(req, res) {
    res.render("landing");
});


app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) console.log(err);
        else res.render("campgrounds", {campgrounds: allCampgrounds});
    })
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})


app.post("/campgrounds", function(req, res) {
   // get data form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
   Campground.create(newCampground, function(err, newlyCreated) {
       if(err) console.log(err)
       else  res.redirect("/campgrounds"); //default redirect is a GET request (basically refresh)  
   })
    // redirect back to campgrounds page
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started.");
});