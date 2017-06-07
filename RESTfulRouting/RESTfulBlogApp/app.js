var bodyParser      = require("body-parser"),
mongoose            = require("mongoose"),
express             = require("express"),
app                 = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful-blog-app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    // If I wanted a default image {type: String, default: "placeholderimage.jpg"}
    body: String,
    //Type is Date, but I dont want the user to type in the date.
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

/*
Used to test initial server start-up
    Blog.create({
        title: "Test Blog",
        image: "https://tse4.mm.bing.net/th?id=OIP.6va4y4_qipIBDIlzgb8rkQE8DF&w=257&h=160&c=7&qlt=90&o=4&pid=1.7",
        body: "This is a test"
        }, function(err, post) {
            if(err) console.log(err);
            else console.log("post successful");
        })
*/

// RESTful ROUTES

// Route redirection 
app.get("/", function(req, res) {
    res.redirect("/blogs");
});

// index page
app.get("/blogs", function(req, res) {
    Blog.find({}, function(err, blogs) {
        if(err) console.log(err);
        else  res.render("index", {blogs: blogs});
    })
});

//show all entries
app.get




app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running");
});