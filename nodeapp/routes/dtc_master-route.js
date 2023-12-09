var express = require('express');
var router = express.Router();
var db=require('../database');
router.get('/dtc_master', function(req, res, next) {
    db.query('SELECT DISTINCT ss_code FROM substation_master ORDER BY ss_code ASC', function(error, data){

        res.render('dtc_master',{ title: 'Express', ss_code: data });

    })
    
  });

  router.get('/get_data', function(request, response, next){


    var type = request.query.type;

    var search_query = request.query.parent_value;

   if(type == 'load_feeder')
    {
        var query = `
        SELECT DISTINCT feed_code AS Data FROM feeder_master
        WHERE ss_code = '${search_query}' 
        
        `;
    }

    
    

    db.query(query, function(error, data){

        var data_arr = [];

        data.forEach(function(row){
            data_arr.push(row.Data);
        });
       
        response.json(data_arr);

    });

});

router.post('/dtcsubmit', function(req, res, next) {
    console.log("submit click");
    
    const  inputData ={
    dtc_code: req.body.dtc_code,
         dtc_name: req.body.dtc_name,
         load_dtc: req.body.load_dtc,
         number_of_consumer: req.body.number_of_consumer,
         feed_code:req.body.feed_code,
         ss_code:req.body.ss_code


     }
 // check unique email address

    console.log(inputData);
     // save users data into database
     var sql = 'INSERT INTO dtc_master SET ?';
    db.query(sql, inputData, function (err, data) {
       
            })
            console.log("gfghg");

        });
        module.exports = router;