var express = require('express');
const user = require('../models/user');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  console.log(user); 
  res.render('index', { title: 'Live Code Share' });
});


// { title: 'my other page', layout: 'other' }
module.exports = router;
