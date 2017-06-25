var express                = require("express"),
    mongoose               = require("mongoose"),
    passport               = require("passport"),
    bodyParser             = require("body-parser"),
    LocalStrategy          = require("passport-local"),
    passportLocalMongoose  = require("passport-local-mongoose"),
    User                   = require("./models/user");



mongoose.connect("mongodb://localhost/auth_demo_app");
var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

//Way to use and require a variable in one function
//secret is for decoding/encoding session, resave/saveUnit are required otherwise you get an error.
app.use(require("express-session")({
    secret: "cats",
    resave: false,
    saveUninitialized: false
}));


//tell express to use passport. 
//ALWAYS NEED THESE 2 lines with passport
app.use(passport.initialize());
app.use(passport.session());

/*
Create a new local strategy, using the user.authenticate that's 
coming from mongoose, then telling passport to use that new local
authenticate.
*/
passport.use(new LocalStrategy(User.authenticate()));
/* User can use the serialize and deserialize methods because 
    I defined them in the user.js file. This way, I can make 
    passport use the same methods for serialize and deserialize 
    that are in user, without having to worry about changing both 
    if needed.  */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res) {
    res.render("home");
});

/*
LOOK AT isLoggedIn definition below:
 -isLoggedIn() was added as middleware, so when a user
    attempts to access the /secret route, the function
    isLoggedIn() runs, and if a TRUE is returned, then the
    callback is ran as NEXT().
*/
app.get("/secret", isLoggedIn, function(req, res) {
    res.render("secret");
});


/* /========
    Auth Routes
============*/
app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {
    req.body.username
    req.body.password
    //make new user that's not saved to db.
    //register gets the new user, a pw that's not saved to the db which is hashed later (auto)
    //and a callback
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err) {
            console.log(err);
            return res.render("register");
        }
        //logs user in, takes care of the session and logs all data.
        //using the local strategy declared in passport's api and defined as a dependency needed in the above variable definitions of passport.
        //once logged in, the callback starts execution.
        passport.authenticate("local")(req, res, function() {
            res.redirect("/secret");
        })
        
    })
});

// LOGIN ROUTES
//render login form:

app.get("/login", function(req, res) {
    res.render("login");
})


//login logic:
/*
passport.authenticate is middleware, where it runs in the middle of
your initial function and the callback. Here, passport.authenticate
takes the username and passport from the form AUTOMATICALLY. The 
inputs are compared to the hashed version in the database and 
either redirects to /secret or /login.
*/
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
    }), function(req, res) {
});


app.get("/logout", function(req, res) {
    //requesting that the server perform a logout
    //password no longer keeping track of session
    req.logout();
    //responding by redirecting to the homepage
    res.redirect("/")
});

/*
- isLogged in is called when the user tries to go to the /secret
    route. If a true response is returned via PASSWORDs isLoggedIn()
    method, then the 'next' parameter is ran. 
- The 'next' is the callback function that's defined inside of 
    /secret's GET route.
*/
function isLoggedIn(req,res,next) {
    //if authenticated, return the next (middleware) function
    if(req.isAuthenticated()) return next();
    //if not logged in, redirect to the login page
    res.redirect("/login");
}



app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server Started");
})