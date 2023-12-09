var express = require('express');
var router = express.Router();
var db=require('../database');

router.get('/dtc_energy_audit', function(req, res, next) {

    db.query('SELECT DISTINCT ss_code FROM substation_master ORDER BY ss_code ASC', function(error, data){

        res.render('dtc_energy_audit',{ title: 'Express', ss_code: data });

    });      

});

router.get('/get_data', function(request, response, next){

    var type = request.query.type;

    var search_query = request.query.parent_value;

    if(type == 'load_feeder')
    {
        var query = `
        SELECT DISTINCT fed_code AS Data FROM feeder_meter_reading
        WHERE ss_code= '${search_query}' 
        ORDER BY fed_code ASC
        `;
    }

    if(type == 'load_dtc')
    {
        var query = `
        SELECT dtc_code AS Data FROM feeder_meter_reading 
        WHERE fed_code = '${search_query}' 
        ORDER BY dtc_code ASC
        `;
    }

    db.query(query, function(error, data){

        var data_arr = [];

        data.foreach(element => {
            
        });(function(row){
            data_arr.push(row.Data);
        });

        response.json(data_arr);

    });

});
module.exports = router;