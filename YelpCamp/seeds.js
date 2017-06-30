var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");
//SEED campground
var campground = [
    {name: "Clouds Rest",
    image: "http://www.rv-camping.org/images/MiscPhotos/USACECampground.jpg",
    description: "Authentic flannel literally, actually PBR&B vegan irony before they sold out. Ugh pickled freegan you probably haven't heard of them poutine literally, lumbersexual kombucha blog 3 wolf moon sartorial banh mi. Ramps vinyl keffiyeh, direct trade vice live-edge shabby chic hot chicken snackwave letterpress paleo skateboard hella typewriter organic. Palo santo mumblecore selvage, vexillologist tote bag la croix edison bulb cloud bread letterpress. Disrupt waistcoat gluten-free deep v chillwave palo santo, pop-up offal vaporware kitsch 3 wolf moon 90's semiotics lomo distillery. "},
    {name: "Desert Mesa",
    image: "http://www.crappie.com/crappie/attachments/off-topic-in-mississippi/250265d1476996185-ms-crappie-camp-lots-pics-imageuploadedbytapatalk1476996185-235388-jpg",
    description: "Nope. Don't go here.! Authentic flannel literally, actually PBR&B vegan irony before they sold out. Ugh pickled freegan you probably haven't heard of them poutine literally, lumbersexual kombucha blog 3 wolf moon sartorial banh mi. Ramps vinyl keffiyeh, direct trade vice live-edge shabby chic hot chicken snackwave letterpress paleo skateboard hella typewriter organic. Palo santo mumblecore selvage, vexillologist tote bag la croix edison bulb cloud bread letterpress. Disrupt waistcoat gluten-free deep v chillwave palo santo, pop-up offal vaporware kitsch 3 wolf moon 90's semiotics lomo distillery. "},
    {name: "Cool Cats",
    image: "http://static.boredpanda.com/blog/wp-content/uploads/2016/07/camping-with-cats-ryan-carter-03-5792243fab316__605.jpg",
    description: "All zeh cats are here.. The cools ones zat tiz.! Authentic flannel literally, actually PBR&B vegan irony before they sold out. Ugh pickled freegan you probably haven't heard of them poutine literally, lumbersexual kombucha blog 3 wolf moon sartorial banh mi. Ramps vinyl keffiyeh, direct trade vice live-edge shabby chic hot chicken snackwave letterpress paleo skateboard hella typewriter organic. Palo santo mumblecore selvage, vexillologist tote bag la croix edison bulb cloud bread letterpress. Disrupt waistcoat gluten-free deep v chillwave palo santo, pop-up offal vaporware kitsch 3 wolf moon 90's semiotics lomo distillery. "}
];

function seedDB(){
    // REMOVE ALL CAMPGROUNDS
      Campground.remove({}, function(err) {
        if(err) {
            console.log(err);
        } else { 
            //ADD NEW CAMPGROUNDS
            campground.forEach(function(seed) {
                Campground.create(seed, function(err, campground) {
                    if(err) console.log(err);
                     else { 
                         console.log("Added campground: " + campground.name);
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