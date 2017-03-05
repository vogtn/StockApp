var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var db = require('./models');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);

app.get('/', function(req,res){
    db.stock.findAll()
    .then(function(stocks){
        res.render('main/index', {stocks: stocks});
    })
    .catch(function(error){
        res.status(400).render('main/404');
    })
})

app.use('/portfolio', require('./controllers/portfolio'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;