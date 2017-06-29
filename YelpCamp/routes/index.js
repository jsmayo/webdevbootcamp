var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res) {
    res.render("landing");
});

//==============================================================
//                  // AUTHENTICATION ROUTE \\                 =
//==============================================================
//show register form
router.get("/register", function(req,res) {
    res.render("register");
});

//handle register logic
router.post("/register", function(req, res){
    //username from the form
  var newUser = new User({username: req.body.username});
  //register method will handle registering to DB and will store the HASHED pw.
  User.register(newUser, req.body.password, function(err, user) {
      //log the error if encountered and redirect back to register form
      if(err) {
         console.log(err);
          //using RETURN to easily break out of this block
         return res.render("register");
      }
      //log into passport if registration was successful and redirect to campgrounds route
      passport.authenticate("local")(req, res, function() {
          res.redirect("/campgrounds");
      });
  });
});

//dispaly login page
router.get("/login", function(req, res) {
    res.render("login");
});

/*
Handle login logic using MIDDLEWARE method:
    - this is the same authenticate method used in REGISTER route, but here
        the user is presumed to exist, whereas in register, there's code to
        create an account before attempting to authenticate the user.
    - HOW THIS LOOKSapp.post("/login", middleware, callback))
*/
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
        
    }),function(req, res) { //leaving this to underscore MIDDLEWARE was used
});

//handle LOGOUT logic
router.get("/logout", function(req, res){
    req.logout(); //destroy session data
    res.redirect("/campgrounds");
});

//Middleware
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