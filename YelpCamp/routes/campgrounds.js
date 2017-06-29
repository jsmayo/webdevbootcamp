//create router variable, add routes to it, export the variable, then require it in app.js
var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//==================================================================
//                  // CAMPGROUNDS ROUTE \\                        =
//==================================================================
router.get("/", function(req, res) {
    console.log(req.user);
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) console.log(err);
        else res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user});
    });
});

router.get("/new", function(req, res) {
    res.render("campgrounds/new");
});


router.post("/", function(req, res) {
   // get data form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    
    //use the above variables to create an object and add it to the DB.
   Campground.create(newCampground, function(err, newlyCreated) {
       if(err) console.log(err);
       else  res.redirect("/campgrounds"); //default redirect is a GET request (basically refresh)  
   });
    // redirect back to campgrounds page
});


//==============================================================
//                      // SHOW ROUTE \\                       =
//==============================================================
/*  This route needs to be AFTER the new
    route, since any ID will be routed to this page. Meaning, that if I placed 
    this route before the "new" route and tried to access "new", I wouldn't be
    able to get to it.
    - Had to delete ALL campgrounds when I added the new description property.
    - db.collection.drop() : removes all data from the collection
*/
router.get("/:id", function(req, res) {
    //Find the campground with the provided ID.
    Campground.findById(req.params.id).populate("comments").exec( function(err, foundCampground) {
        if(err) console.log(err);
        else res.render("campgrounds/show", {campground: foundCampground});
    });
    //Show the information about the ID
});

module.exports = router;