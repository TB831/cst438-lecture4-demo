var express = require('express');
var router = express.Router();
var https = require('https'); 

var myArray = ["motivation","cars","sports","nfl","programming"];
var search = myArray[Math.floor(Math.random() * myArray.length)];


console.log("In getty!!!!!!!!!!!!"); 
console.log("api key: " + process.env.GETTY_API_KEY); 

function makeApiRequest(sendBackResponseToBrowser) {
    const options = {
        hostname: "api.gettyimages.com", 
        port: 443, 
        path: '/v3/search/images?phrase=' + search,
        method: 'GET', 
        headers: {
            'Api-Key': process.env.GETTY_API_KEY
        }
    }; 
    var apiResponse = ''; 
    
    https.get(options, function(response){
        response.setEncoding('utf8');
        response.on('data', function(chunk) {
            console.log("received data: "); 
            apiResponse += chunk; 
        }); 
        
        response.on('end', function() {
            console.log("status code: " + this.statusCode); 
            //console.log("Complete response: " + apiResponse); 
            /*execute callback*/
            var responseJSON = JSON.parse(apiResponse); 
            var images = responseJSON.images;
            console.log(responseJSON); 
            console.log("num images: " + images.length); 
            console.log("url of first image: " + images[0].display_sizes[0].uri); 
            var imageURI = images[0].display_sizes[0].uri; 
            
            sendBackResponseToBrowser(imageURI); 
            
        }); 
    }).on("error", function(e) {
        console.log("Got an error: " + e.message); 
    }); 
}

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express', className: 'CST438' });
  makeApiRequest(function(imageURI){
      res.render('getty', {imageURI: imageURI});
  }); 
});

module.exports = router;
