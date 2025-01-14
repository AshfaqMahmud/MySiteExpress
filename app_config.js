/**
 * use this file to import the default express conf
 */
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware: Body Parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//set up handlebar engine
const handlebars = require('express-handlebars').create({
    defaultLayout: 'main'
});
app.engine('handlebars',handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", process.env.PORT || 3000);

module.exports = app;

