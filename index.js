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
