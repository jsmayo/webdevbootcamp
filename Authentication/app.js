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

app.get("/secret", function(req, res) {
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
        //using the local strategy declared in passports api
        //once logged in, the callback starts execution.
        passport.authenticate("local")(req, res, function() {
            res.redirect("/secret");
        })
        
    })
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server Started");
})