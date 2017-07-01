var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    methodOverride  = require("method-override"),
    Campground      = require("./models/campground"),
    Comment         = require("./models/comment"),
    User            = require("./models/user"),
    seedDB          = require("./seeds");

//Requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes          = require("./routes/index");
    
  
//setup the database
mongoose.connect("mongodb://localhost/yelp_camp");    
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//connect  CSS
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); //telling it to use methodOverride var, which is told to use _method as it's trigger
//seed the database with comments:
//seedDB(); //this needs to be first to run after server starts
   
   

//==================================================================
//                 // PASSPORT CONFIGURATION \\                    =
//   1. Session data will use the object I'm passing in.           =
//   2. Resave and Save Unitialized are options that are required. =
//==================================================================
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

app.use(function(req, res, next) {
    //pass currentUser to be req.user to EVERY template
    //whatever is inside of res.locals will be avail to all templates
    res.locals.currentUser = req.user;
    //run the next code from middlewear
    next();
});

//Requiring imported files and assigning prefixes
app.use(indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("The YelpCamp server has started.");
});