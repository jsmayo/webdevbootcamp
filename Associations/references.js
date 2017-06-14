var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2");
var Post = require("./models/post"); // Not including the home directory '.' will give an error.
var User = require("./models/user"); 

// //create a single user to add 
// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Jenkins"
// });
// comment out to create a post without it being attached by creation.

Post.create({
    title: "How to cook the best chicken!",
    content: "Not burgers this time.. chicken!"}, function(err, post) {
        //Find the user we want to add the post to
        User.findOne({ email: "bob@gmail.com"}, function(err, foundUser){
            if(err) console.log(err);
            else {
                //add the found post to the user!
                foundUser.posts.push(post);
                //save the new association to the database
                foundUser.save(function(err, updatedData){
                    if(err) console.log(err);
                    //just show the data to know that it was added.
                    else console.log(updatedData);
                });
            }
    });
});

//Find a user with no callback. The populate will fill the post array once called by exec.
// User.findOne({email: "bob@gmail.com"}).populate("posts").exec(function(err, user) {
//     if(err) console.log(err);
//     else console.log(user);
// });