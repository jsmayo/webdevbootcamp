
/* 
Here's the new way of making requests with the key:
General search: 

s = general search search 
API: http://www.omdbapi.com/
  -  http://www.omdbapi.com/?s=guardians+of+the+galaxy&apikey=thewdb 
  -  http://www.omdbapi.com/?s=star&apikey=thewdb

Search with Movie ID: http://www.omdbapi.com/?i=tt3896198&apikey=thewdb 
you must append &apikey=thewdb to the end of your url.
*/
var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("search");
});
/*
Request code inside of a route. 
So, user goes to /results and 
get back the results for what I hard-coded below:
*/
app.get("/results", function(req, res) {
   // res.send("hello"); //make sure API connected
   var query = req.query.search; //this is coming from search.ejs
   var apiKey = "&apikey=thewdb";
   var url = "http://www.omdbapi.com/?s=" + query + apiKey;
   request(url, function(error, response, body){
       if(!error && response.statusCode == 200) {
        //   res.send(body); full search query returned in array format.
           var data = JSON.parse(body); //need to parse the body into an object with parser to access the array
        //   res.send(results["Search"][0]["Title"]); 
             res.render("results", {data: data}); //results.data is replaced with this.data 
             //switching from a console output to passing into an html template (to make a dynamic results page)
       }
   })
})


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Movie App. has started.")
})