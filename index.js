var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

// app.get is the method by which we are adding routes
// here we can see no need to normalize the url path

//if app.get is not used here, we get error output
// app.get("/", function (req, res) {
//   res.type("text/plain");
//   res.send("My Website with Express");
// });

// app.get("/about", function (req, res) {
//   res.type("text/plain"); // provided by Express
//   res.send("About");
// });

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/about", function (req, res) {
  res.render("about");
});

// information sent by browser
/*
host: localhost:3000
connection: keep-alive
sec-ch-ua: "Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"
sec-ch-ua-mobile: ?0
sec-ch-ua-platform: "Windows"
upgrade-insecure-requests: 1
user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36
accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/
/*;q=0.8,application/signed-exchange;v=b3;q=0.7
sec-fetch-site: none
sec-fetch-mode: navigate
sec-fetch-user: ?1
sec-fetch-dest: document
accept-encoding: gzip, deflate, br, zstd
accept-language: en-US,en;q=0.9,bn;q=0.8
*/
app.get('/headers',function(req, res){
  res.set('Content-type','text/plain');
  var s= '';
  for(var name in req.headers) 
    s += name + ': '+ req.headers[name]+'\n';     // req.headers is headers received from client
  console.log(s);
  

});

app.use(function (req, res, next) {
  res.status(404);
  res.render("404");
});

app.use(function (err, req, res, next) {
  console.log(err.stack);
  res.status(500);
  res.render("500");
});

//app.get must be used before app.use
//custom 404 page
// app.use(function (req, res) {
//   res.type("text/plain");
//   res.status(404);
//   res.send("404 - Not found");
// });

// //custom 500 page
// app.use(function (err, req, res, next) {
//   console.error(err.stack);
// });

app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press ctrl-c to terminate"
  );
});

// Here NodeJs functions were: res.end, res.writeHead
// Instead Express gives us: res.send, res.set / res.status, extra: res.type
