var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema( {
    username: String,
    password: String
});

//this is the plugin that gives methods for passport to the User Model
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);