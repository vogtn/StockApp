var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();
var request = require('request');
require("dotenv").config();
var SlackStrategy = require('passport-slack').Strategy;
var passport = require('passport');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static("public"));

var d3 = require('d3');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
app.locals.XMLHttpRequest = XMLHttpRequest;
app.locals.d3 = d3;



//Passport setup
passport.use(new SlackStrategy({
    clientID: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET
  }, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  }
));
 
 //session
var session = require('express-session');
app.use(session({secret: "nicv"}));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // user by id?
  done(null, user);
});


app.get('/', function(req,res){
    res.render('main/login');
})


app.get('/auth/slack/', passport.authorize('slack'));
 
app.get('/auth/slack/callback',
  passport.authenticate('slack', { failureRedirect: '/' }),
  (req, res) => res.redirect('/portfolio') // Successful authentication, redirect to portfolio. 
);


//check if authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}


app.use('/portfolio', ensureAuthenticated, require('./controllers/portfolio'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;