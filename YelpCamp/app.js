var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

//setup the database
mongoose.connect("mongodb://localhost/yelp_camp");    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//connect  CSS
app.use(express.static(__dirname + "/public"))
//seed the database with comments:
seedDB(); //this needs to be first to run after server starts
   
   
/*
----PASSPORT CONFIGURATION:
   1. Session data will use the object I'm passing in. 
   2. Resave and Save Unitialized are options that are required.
----
*/
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
//these methods come with passport-local-mongoose, otherwise they need hardcoding.
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function(req, res) {
    res.render("landing");
});


app.get("/campgrounds", function(req, res) {
    // Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds) {
        if(err) console.log(err);
        else res.render("campgrounds/index", {campgrounds: allCampgrounds});
    })
})

app.get("/campgrounds/new", function(req, res) {
    res.render("campgrounds/new");
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
//============================================
// SHOW ROUTE
//============================================
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
        else res.render("campgrounds/show", {campground: foundCampground});
    });
    //Show the information about the ID
});


//============================================
// COMMENTS ROUTE
//============================================
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground) {
        if(err) console.log(err);
        else {
            res.render("comments/new", {campground: campground});
        }
    });
});


//POST ROUTE FOR COMMENTS:
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
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
})



//============================================
//AUTH ROUTES
//============================================


//SHOW REGISTER FORM
app.get("/register", function(req,res) {
    res.render("register");
});

//HANDLE SIGN UP LOGIC:
app.post("/register", function(req, res){
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
app.get("/login", function(req, res) {
    res.render("login");
});

/*
Handle login logic using MIDDLEWARE method:
    - this is the same authenticate method used in REGISTER route, but here
        the user is presumed to exist, whereas in register, there's code to
        create an account before attempting to authenticate the user.
    - HOW THIS LOOKSapp.post("/login", middleware, callback))
*/
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
        
    }),function(req, res) { //leaving this to underscore MIDDLEWARE was used
});

//handle LOGOUT logic
app.get("/logout", function(req, res){
    req.logout(); //destroy session data
    res.redirect("/campgrounds");
});

/*
Make sure a user cannot comment if not logged into the site:
    - you can use this anywhere, but I'm placing into comment route
*/
function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next(); //run the next function defined after the middleware
    }
     // make the user login if not authenticated
    res.redirect("/login");
}

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started.");
});