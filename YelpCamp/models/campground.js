var mongoose = require("mongoose");

//create the Schema/Pattern
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }]
})

//compile the model and set it as the export
module.exports = mongoose.model("Campground", campgroundSchema);