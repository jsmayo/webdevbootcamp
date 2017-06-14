var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
//SEED DATA
var data = [
    {name: "Clouds Rest",
    image: "http://www.rv-camping.org/images/MiscPhotos/USACECampground.jpg",
    description: "The name is awesome!"},
    {name: "Desert Mesa",
    image: "http://www.crappie.com/crappie/attachments/off-topic-in-mississippi/250265d1476996185-ms-crappie-camp-lots-pics-imageuploadedbytapatalk1476996185-235388-jpg",
    description: "Nope. Don't go here.!"},
    {name: "Cool Cats",
    image: "http://static.boredpanda.com/blog/wp-content/uploads/2016/07/camping-with-cats-ryan-carter-03-5792243fab316__605.jpg",
    description: "All zeh cats are here.. The cools ones zat tiz.!"}
];

function seedDB(){
    // REMOVE ALL CAMPGROUNDS
      Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else { 
            //ADD NEW CAMPGROUNDS
            data.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if(err) console.log(err);
                     else { 
                         console.log("Added campground: " + data.name);
                         // Create a comment after creating the campground
                         Comment.create({
                             text: "Seriously needs some internet",
                             author: "Clark Kent",
                             }, function(err, comment) {
                                 if(err) console.log(err);
                                 else {
                                     campground.comments.push(comment);
                                     campground.save();
                                     console.log(campground);
                                }
                         });
                     }
                });
            });
        }
          
      });
}
      
    

module.exports = seedDB;
/*
HOW THIS WORKS:
1. sends out the seedDB function()
2. stored in seedDB variable that's declared at the top of app.js
3. The function is called in app.js with seedDB()
*/