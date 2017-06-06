var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

// Define a pattern template for cat objects. 
var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
    //as of now, you would not get an error if these were blank.
});

/* Compile the catSchema pattern into a model: Cat:
    1. Variable for the model should always be singular w/ capital letter.
    2. This makes a new db => db.cats 
    3. Contains methods that I can use with Cats. 
*/
var Cat = mongoose.model("Cat", catSchema);

/*
-------------------------------------------------
CREATE A NEW CAT AND SAVE INDIVIDUALLY:

    //Create a new cat
    var george = new Cat({
        name: "Mrs. Norris (from Harry Potter)",
        age: 500,
        temperment: "Evil!!!!!!"
    });


//save the cat to the DB w/o callback
    george.save();

/* 
If the internet goes out or something goes wrong with the database, 
using a callback function will notify the user if the variable was 
saved or if an error occurred.
*//*
    george.save(function(err, cat) {
        if(err) {
            console.log("Something went wrong!");
        } else {
            console.log("Just saved a cat to the DB:");
            console.log(cat);
        }
    });
    ----------------------------------------------------
*/



/*
Retrieve All Cats From The DB:
1. First arg is an empty object, since we aren't looking for 
    any cat in particular.
2. Second arg is the callback function, which will let me know if
    an error occured.
        A) The callback only runs when the find method finishes,
            which could take a while if the DB were big, internet 
            connection was slow, etc... 
*/
Cat.find({}, function(err, cats) {
    if(err){ 
        console.log("Error!!!");
        console.log(err);
    } else {
        console.log("ALL THE CATS.....");
        console.log(cats);
    }
});

/*
Create Cat object in one step.
  - Instead of using new() and save() on each cat.
*/
Cat.create({
    name: "Snow White",
    age: 2,
    temperament: "energetic"
}, function(err, cat) {
    if(err) console.log(err);
    else console.log(cat);
});