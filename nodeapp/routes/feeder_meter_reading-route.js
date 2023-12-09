var express = require('express');
var router = express.Router();
var db=require('../database');
router.get('/feeder_meter_reading', function(req, res, next) {
    db.query('SELECT DISTINCT ss_code FROM substation_master ORDER BY ss_code ASC', function(error, data){

        res.render('feeder_meter_reading',{ title: 'Express', ss_code: data });

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
router.post('/feedermeterreadingsubmit', function(req, res, next)
 {
    
        const  inputData ={
        ss_code:req.body.ss_code,
        feed_code: req.body.feed_code,
        mm:req.body.mm,
        yy:req.body.yy,

        reading:req.body.reading
         
         


        }
         
 // check unique email address

      console.log(inputData);
     // save users data into database
        var sql = 'INSERT INTO feeder_meter_reading SET ?';
         db.query(sql, inputData, function (err, data) {
       
            })
            console.log("gfghg");



            
            
        
            db.query('select max(mm) from feeder_meter_reading', function (err, data) {
                res.render('feeder_meter_reading',{ title: 'Express', max: data });

                


          
        
         
        
        });
    
        });
       
   
       

    
   
        module.exports = router;