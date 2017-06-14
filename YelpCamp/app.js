var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");

//setup the database
mongoose.connect("mongodb://localhost/yelp_camp");    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//seed the database with comments:
seedDB(); //this needs to be first to run after server starts
      
app.get("/", function(req, res) {
    res.render("landing");
});


app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) console.log(err);
        else res.render("index", {campgrounds: allCampgrounds});
    })
})

app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs");
})


app.post("/campgrounds", function(req, res) {
   // get data form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    
    //use the above variables to create an object and add it to the DB.
   Campground.create(newCampground, function(err, newlyCreated) {
       if(err) console.log(err)
       else  res.redirect("/campgrounds"); //default redirect is a GET request (basically refresh)  
   })
    // redirect back to campgrounds page
})

/*
SHOW ROUTE:
This route needs to be AFTER the new
route, since any ID will be routed to this page. Meaning, that if I placed 
this route before the "new" route and tried to access "new", I wouldn't be
able to get to it.
    - Had to delete ALL campgrounds when I added the new description property.
    - db.collection.drop() : removes all data from the collection
*/
app.get("/campgrounds/:id", function(req, res) {
    //Find the campground with the provided ID.
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground) {
        if(err) console.log(err);
        else res.render("show", {campground: foundCampground});
    });
    //Show the information about the ID
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started.");
});