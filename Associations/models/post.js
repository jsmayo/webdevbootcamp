var mongoose = require("mongoose");
//POST: Title, Content
var postSchema = new mongoose.Schema({
    title: String,
    content: String,
});

// Requiring a file typically means you need it to export something.
module.exports = mongoose.model("Post", postSchema);
//The model that we're exporting is just the postSchema object that was
//originally defined as: var Post = mongoose.model("Post", postSchema); 