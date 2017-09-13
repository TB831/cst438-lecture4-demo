var express = require('express');
var router = express.Router();
var https = require('https'); 

const options = {
    hostname: "api.gettyimages.com", 
    port: 443, 
    path: '/v3/search/images',
    method: 'GET', 
    headers: {
        'Api-Key': 're59kndb4ptwcvf4j6dmnt8u'
    }
}; 

function makeApiRequest(sendBackResponseToBrowser) {
    var apiResponse = ''; 
    
    https.get(options, function(response){
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            console.log("received data: "); 
            apiResponse += chunk; 
        }); 
        
        response.on('end', function() {
            console.log("status code: " + this.statusCode); 
            console.log("Complete response: " + apiResponse); 
        }); 
    }).on("error", function(e) {
        console.log("Got an error: " + e.message); 
    });
}


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express', className: 'CST438' });
  makeApiRequest(function() {
      res.send("hurrah")
  });
});

module.exports = router;
