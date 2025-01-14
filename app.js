const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const exhbs = require("express-handlebars");

const app = express();
const PORT = 3000;
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to handle sessions
app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 }, // session expires in 1 minute
  })
);

// Middleware to parse query strings (built-in Express features)
app.use(express.urlencoded({ extended: true }));

// Set the view engine to Handlebars
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);


app.set("view-engine", "hbs");
app.set("views", "./views");

// set up a sample route to set a cookie and session value
app.get("/set-session", (req, res) => {
  // set cookie and session variable
  res.cookie("userid", "12345");
  (req.session.username = "Ashfaq"),
    res.send("Cookie and session set. visit /greeting");
});

// Route for rendering the about view
app.get("/greeting", (req, res) => {
  res.render("greeting", {
    message: "Welcome",
    style: req.query.style || "default",
    userid: req.session.userid || "GUEST",
    username: req.session.username || "Anonymous",
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:3000`);
});
