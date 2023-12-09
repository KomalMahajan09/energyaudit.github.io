var express = require('express');
var router = express.Router();
var db=require('../database');
router.get('/sub_master', function(req, res, next) {
    res.render('sub_master');
  });

router.post('/submastersubmit', function(req, res, next) {
    
    const  inputData ={
    ss_code: req.body.ss_code,
         ss_name: req.body.ss_name
        


     }
 // check unique email address

      console.log(inputData);
     // save users data into database
     var sql = 'INSERT INTO substation_master SET ?';
    db.query(sql, inputData, function (err, data) {
       
            })
  

        });
        module.exports = router;