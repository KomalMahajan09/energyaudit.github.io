var express = require('express');
var router = express.Router();
var db=require('../database');
router.get('/dtc_meter_reading', function(req, res, next) {
    console.log("I am page loader");

    db.query('SELECT DISTINCT ss_code FROM substation_master ORDER BY ss_code ASC', function(error, data){

        res.render('dtc_meter_reading',{ title: 'Express', ss_code: data });

    });      

});
router.get('/get_data', function(request, response, next){

    console.log("eeeeeeeeeee");
    alert("get data ");
    var type = request.query.type;

    var search_query = request.query.parent_value;

   if(type == 'load_feeder')
    {
        console.log("I am in load feeder");
        var query = `
        SELECT DISTINCT feed_code AS Data FROM feeder_master
        WHERE ss_code= '${search_query}' 
        
        `;
    }

    if(type == 'load_dtc')
    {
        
        console.log("I am in load dtc");
        var query = `
        SELECT DISTINCT  dtc_code AS Data FROM dtc_master
        WHERE feed_code = '${search_query}' 
       
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

router.post('/dtcmeterreadingsubmit', function(req, res, next) {
    
    const  inputData ={
        ss_code:req.body.ss_code,
    fed_code: req.body.feed_code,
    dtc_code: req.body.dtc_code,
    readingmonth:req.body.date,
    reading:req.body.reading
         
         


     }
 // check unique email address

      console.log(inputData);
     // save users data into database
     var sql = 'INSERT INTO dtc_meter_reading SET ?';
    db.query(sql, inputData, function (err, data) {
       
            })
            console.log("gfghg");

        });
        module.exports = router;