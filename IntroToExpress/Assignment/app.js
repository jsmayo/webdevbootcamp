var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.send("Hi there, welcome to my assignment!");
});
app.get("/speak/:animal/", function(req, res) {
    var sounds = {
        dog: "woof",
        cat: "meow",
        cow: "mooooooo",
        donkey: "heeehawheeehaw",
        pig: "oink"
    }
    var animal = req.params.animal.toLowerCase();
    res.send("The " + animal + " says '" + sounds[animal] + "'.");
    if(req.params.animal === "pig") res.send("oink");
    // else if(req.params.animal === "dog") res.send("woof"); 
    // else if(req.params.animal === "cat") res.send("meow");
    // else if(req.params.animal === "cow") res.send("moo");
    // else if(req.params.animal === "donkey") res.send("heee haaaw");
    
});
app.get("/repeat/:string/:num/", function(req, res) {
    var limit = Number(req.params.num);
    var message = "";
    for(var i = 0 ; i < limit; i++) message += req.params.string + " ";
    //You can only use .send() one time, which is why I built the message
    //inside of  the loop BEFORE sending it. 
    res.send(message);
});

app.get("*", function(req, res) {
    res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("server initiated");
});
//This is the environment variable and IP for cloud 9
