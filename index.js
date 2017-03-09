var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();
var request = require('request');
require("dotenv").config();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);



app.get('/', function(req,res){
    res.render('main/login');
})

app.get('/slack', function(req,res){
    if(!req.query.code){
        res.send('Youve been denied!');
        return;
    }
    var data = {form: {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: req.query.code
  }};
  request.post('https://slack.com/api/oauth.access', data, function (error, response, body){
      if(!error && response.statusCode == 200){
          let teamId = JSON.parse(body).team.id;
          res.redirect('/portfolio');
      }else{
          res.redirect('/');
      }
  })
})

app.use('/portfolio', require('./controllers/portfolio'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;