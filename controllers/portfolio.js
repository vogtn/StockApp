var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/', function(req,res){
    db.portfolio.findAll()
    .then(function(stocks){
        res.render('main/portfolio', {stocks: stocks});
    })
    .catch(function(error){
        res.status(400).render('main/404');
    })
});

router.get('/:id', function(req,res){
    res.send(req.params.id);
})



module.exports = router;