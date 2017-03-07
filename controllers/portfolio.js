var express = require('express');
var db = require('../models');
var router = express.Router();
var request = require('request');

router.get('/', function(req,res){
    db.portfolio.findAll()
    .then(function(stocks){
        res.render('main/portfolio', {stocks: stocks});
    })
    .catch(function(error){
        res.status(400).render('main/404');
    })
});

router.get('/:id/:date', function(req,res){
    //getting current date
    var d = new Date();
    var curdateM = d.getMonth();
    var curdateD = d.getDate();
    var curdateY = d.getFullYear();
    var id = req.params.id;
    //date separted in to (Month) + (date) + (year)
    var buydateM = (req.params.date).split(" ")[1];
    var buydateD = (req.params.date).split(" ")[2];
    var buydateY = (req.params.date).split(" ")[3];
    //'http://www.google.com/finance/historical?q=NASDAQ:ADBE&startdate=Jan+01%2C+2017&enddate=Mar+6%2C+2017&output=csv'
    //'http://www.google.com/finance/historical?q=NASDAQ:' + id  +'&startdate='+ buydateM +'+' + buydateD + '%2C+' + buydateY + '&enddate='+curdateM +'+'+ curdateD+ '%2C+'+curdateY+'&output=csv'

    //starts on the first day of the month
    request({
    url: 'http://www.google.com/finance/historical?q=NASDAQ:' + id  +'&startdate='+ buydateM +'+' + '01' + '%2C+' + buydateY + '&enddate='+curdateM +'+'+ curdateD+ '%2C+'+curdateY+'&output=csv'
   }, function(error, response, body){
     if(!error && response.statusCode == 200){
       res.send(body);
     }
  })
})



module.exports = router;