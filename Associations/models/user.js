//ORIGINALLY FROM REFERENCES.JS:

var mongoose = require("mongoose");

//USER: Email, Name
var userSchema = new mongoose.Schema({
   email: String,
   name: String,
   // array of post OBJECT id's inside of user
   posts: [
       {
           //Syntax for Mongoose Schema Types
           type: mongoose.Schema.Types.ObjectId,
           // Type belongs to Post
           ref: "Post"
       }] //need postSchema defined before using this syntax
});

//turn the schema into a model and set it as the export
module.exports = mongoose.model("User", userSchema);
/* exports does not have to be a single object, you can make 
an object { ... } and set it as the export. However, module 
creates an object for you. */