var mongoose = require("mongoose");

var commentSchema = mongoose.Schema( {
    text: String,
    //storing information of user at time of comment, instead of using id to find the username
    // this can only be done with a non-relational database like mongo
    author:  {
                id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                    }, 
                    username: String
        
    }
});

module.exports = mongoose.model("Comment", commentSchema);