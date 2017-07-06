var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) console.log(err);
        else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Comments create
router.post("/", middleware.isLoggedIn, function(req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function(err, campground) {
        if(err) {
            console.log(err);
            req.flash("error", "Something went wrong.");
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment) {
                if(err) console.log(err);
                else {
                    //if all good, associate comment to the campground
                    //add username and id to author, since that's how I defined the author object
                    comment.author.id = req.user._id; 
                    comment.author.username = req.user.username;
                    //save comment to the database 
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Comment added successfully!");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err) res.redirect("back");
        else res.render("comments/edit", {campground_id:  req.params.id, comment: foundComment});
    })
});

router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    //findByIdAndUpdate(replaceThis, withThis, ThenDoThis)
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err) res.redirect("back");
        else res.redirect("/campgrounds/" + req.params.id);
    });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
    //findbyIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err) res.redirect("back");
        else res.redirect("/campgrounds/" + req.params.id);
    })
});


module.exports = router;
