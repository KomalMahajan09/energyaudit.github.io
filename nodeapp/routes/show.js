var express = require('express');
var router = express.Router();
var db=require('../database');
router.get('/show', function(req, res, next) {
    res.render('show');
  });

  module.exports = router;