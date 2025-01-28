const app = require("./app_config");

/**
 * 1️⃣ Install Required Dependencies
    Run the following command to install necessary npm packages:

    --npm install express cookie-parser express-session dotenv bcryptjs
 */

// Load environment variable
require("dotenv").config();
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const path = require("path");

//set up handlebar engine
const handlebars = require("express-handlebars").create({
  defaultLayout: "main_session",
});

// cookieParser with express app from app_config
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 6000,
    },
  })
);

// Route: Login Page as Home
app.get("/", (req, res) => {
  res.render("login", { message: null });
});

// Handle Login and Route
app.post("/login", (req, res) => {
    const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  const { username, password } = req.body;

  if (
    username === ADMIN_USERNAME &&
    bcrypt.compareSync(password, ADMIN_PASSWORD)
  ) {
    req.session.user = username; // store session data
    res.cookie("theme", "dark", {
      maxAge: 86400000,
      httpOnly: true,
    });
    return res.redirect("/dashboard");
  } else {
    return res.render("login", { message: "Inavlid username or password" });
  }
});

// Route: Protected Dashboard (session required)
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("/"); //reload homepage
  }
  res.render("dashboard", {
    username: req.session.user,
    theme: req.cookies.theme || "light",
  });
});

// Logout Route (Destroy session and clear cookies)
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("theme");
    res.redirect("/");
  });
});

// Start the server
app.listen(app.get("port"), function () {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press ctrl-c to terminate"
  );
});
