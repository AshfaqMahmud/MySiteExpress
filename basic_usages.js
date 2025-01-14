var express = require('express');
var app = express();

var handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});
app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

// basic usage
app.get('/about',function(req,res){
    res.render('about');
});

app.get('/error',function(req,res){
    res.status(500).res.render('error');
    // the above code is equivalent like the following:
    // res.status(500);
    // res.render('error');
});

// passing a context to a view, including querystring, cookie, session
app.get('/greeting', function(req,res){
    res.render('about', {
        message: 'welcome',
        style: req.query.style,
        userid: req.cookie.userid,
        username: req.session.username,
    });
});

// rendering a view without a layout
app.get('/no-layout',function(req,res){
    res.render('no-layout',{
        layout: null
    });
});

// rendering with custom layout
app.get('/clayout',function(req,res){
    res.render('custom-layout',{
        layout: 'custom'
    });
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

app.listen(app.get("port"), function () {
    console.log(
      "Express started on http://localhost:" +
        app.get("port") +
        "; press ctrl-c to terminate"
    );
  });