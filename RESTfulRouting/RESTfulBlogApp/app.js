var bodyParser      = require("body-parser"),
methodOverride      = require("method-override"),
mongoose            = require("mongoose"),
express             = require("express"),
app                 = express();

// APP CONFIG
mongoose.connect("mongodb://localhost/restful-blog-app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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
    });
});

// NEW ROUTE
app.get("/blogs/new", function(req, res) {
   // You want the same form everytime you make a new post.
   // Render the post template.
    res.render("new");
});

// CREATE ROUTE
app.post("/blogs", function(req, res) {
    Blog.create(req.body.blog, function(err, newBlog) {
        if(err) res.render("new");
        else res.redirect("/blogs");
            
    })
});

//SHOW ROUTE
app.get("/blogs/:id", function(req, res) {
    Blog.findById(req.params.id, function(err, foundBlog) {
        if(err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    });
});


//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
   Blog.findById(req.params.id, function(err, foundBlog) {
       if(err) res.redirect("/blogs");
       else(res.render("edit", {blog: foundBlog}));
   });
});

// UPDATE ROUTE:

app.put("/blogs/:id", function(req, res) {
    // findByIdAndUpdate requires 3 parameters: locatorID, newData, & callback
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
        if(err) res.redirect("/blogs");
        //redirect to newly edited post, which will have updated info
        else res.redirect("/blogs/" + req.params.id);
    });
});

// DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
    Blog.findByIdAndRemove(req.params.id, function(err) {
        if(err) res.redirect("/blogs");
        else res.redirect("/blogs");
    });
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is running");
});