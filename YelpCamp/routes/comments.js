var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comments new
router.get("/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) console.log(err);
        else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Comments create
router.post("/comments", isLoggedIn, function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) console.log();
                else {
                    //if all good, associate comment to the campground
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//Middleware: refactoring later
/*Make sure a user cannot comment if not logged into the site:
- you can use this anywhere, but I'm placing into comment route*/
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next(); //run the next function defined after the middleware
    }
     // make the user login if not authenticated
    res.redirect("/login");
}

module.exports = router;
