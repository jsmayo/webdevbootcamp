var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

//POST: Title, Content
var postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

//turn the schema into a model
var Post = mongoose.model("Post", postSchema); 


//USER: Email, Name
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   // array post inside of user
   posts: [postSchema] //need postSchema defined before using this syntax
});

//turn the schema into a model
var User = mongoose.model("User", userSchema);


// CREATE AND ADD DATA:
// var newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// });

// push a post inside of the new user
// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content: "Just kidding, go to potions class!"
// })

// save to database
// newUser.save(function(err, user) {
//     if(err) console.log(err);
//     else console.log(user);
// });

//INDIVIDUAL CREATE AND SAVE TO DB:
// var newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// });

// Save to mongoose    
// newPost.save(function(err, post) {
//         if(err) console.log(err);
//         else console.log(post);
// })


// RETRIEVE & ADD DATA ASSOCIATIONS:
//using only findOne, since find() would return an array
User.findOne({name: "Hermione Granger"}, function(err, user) {
    if(err) {
        
    } //console.log(err);
    else {
        //push in a new post
        user.posts.push({ //user is from the callback when found
            title: "3 Things I Hate",
            content: "Voldemort. Voldemort. Voldemort"
        });
        //save new post to DB
        user.save(function(err, user) { //user is from the callback when saved
            if(err) console.log(err);
            else console.log(user);
        });
    }
});

/*
----------------
    OUTPUT:
----------------
{ _id: 593fffcc8e8be609366496e4,
  email: 'hermione@hogwarts.edu',
  name: ‘Hermione Granger',
  __v: 1,
  posts: 
   [ { title: 'How to brew polyjuice potion',
       content: 'Just kidding, go to potions class!',
       _id: 593fffcc8e8be609366496e5 },
     { title: '3 Things I Hate',
       content: 'Voldemort. Voldemort. Voldemort',
       _id: 594004a4c6b63209af3c2247 } ] } 
-----------------
This is the new post that was added, both stored inside the posts array,
one:many type association
-----------------
*/