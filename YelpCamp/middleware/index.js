//refactoring all middleware to this file
//REQUIRES CAMPGROUND & COMMENT BC OF LINES: 13 AND 32

var Campground = require("../models/campground");
var Comment = require("../models/comment");


//creation of an object to hold ALL of the middleware objects, which are added one by one.
var middlewareObj = {};

middlewareObj.checkOwnership = function (req, res, next) {
     if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if(err) { 
                res.redirect("back");
            } else {
             //does user own campground?
                if(foundCampground.author.id.equals(req.user._id)) {  
                    next(); //user is authenticated and authorized to edit their post
                } else {
                    res.redirect("back"); //takes the user back to the previous page they were on
                }
            }
        });
    } else {
        res.redirect("back");
    }
}  ;

middlewareObj.checkCommentOwnership = function(req, res, next) {
     if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if(err) { 
                res.redirect("back");
            } else {
             //does user own campground?
                if(foundComment.author.id.equals(req.user._id)) {  
                    next(); //user is authenticated and authorized to edit their post
                } else {
                    res.redirect("back"); //takes the user back to the previous page they were on
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()){
        return next(); //run the next function defined after the middleware
    }
     // make the user login if not authenticated
    res.redirect("/login");
};

module.exports = middlewareObj;

/* NOTES:
1. Make middleware directory
2. Create the middleware variable and assigned it to an empty object.
3. Added each middleware function that was inside of CAMPGROUND and COMMENT to those newly created variables.
4. DELETE the middleware code from inside of campground and comment files, since you want those methods to use the code inside of the middleware file. 
5. Change the middleware parameter that’s used inside of campground and comment files, to be middleware.FUNCTION_NAME.
    * using "middleware.” because that’s the variable that was created to hold ALL of the middleware methods.
6. REQUIRE middleware in the top of BOTH the COMMENT and CAMPGROUND files by pointing the argument of the requires to the middleware path.
    * You do not have to point to .index because pointing to a directory automatically requires the index page
7. REQUIRE the CAMPGROUND and COMMENT file in the top of the MIDDLEWARE file, since you need to reference a Campground and Comment object (approx lines 13 and 33).
8. DO NOT FORGET TO EXPORT THE MIDDLEWARE OBJECT, OTHERWISE YOU HAVE CREATED A FILE THAT DOES NOTHING. 
*/