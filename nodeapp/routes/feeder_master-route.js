var express = require('express');
var router = express.Router();
var db=require('../database');
router.get('/feeder_master', function(req, res, next) {
    db.query('SELECT DISTINCT ss_code FROM substation_master ORDER BY ss_code ASC', function(error, data){

        res.render('feeder_master',{ title: 'Express', ss_code: data });

    });      

});

router.post('/feedersubmit', function(req, res, next) {
    
    const  inputData ={
    feed_code: req.body.feed_code,
         feed_name: req.body.feed_name,
         ss_code:req.body.ss_code
         


     }
 // check unique email address

      console.log(inputData);
     // save users data into database
     var sql = 'INSERT INTO feeder_master SET ?';
    db.query(sql, inputData, function (err, data) {
       
            })
            console.log("gfghg");

        });
        module.exports = router;