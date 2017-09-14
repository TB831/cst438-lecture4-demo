var https = require('https'); 
var btoa = require('btoa');

var keys = {
    client: 'Xy3WOLIgPe4AIiBhHt4EBPRKx', 
    secret: 'TjU1lEByqhGS5vnGK02M9trY98PycbqI09fVGmCexPj2VumwJQ'
}

var combined = keys.client + ":" + keys.secret; 
var base64encoded = btoa(combined); 

console.log("encode: " + base64encoded); 

function getAccessToken(handleAccessTokenResponse) {
    const options = {
        hostname: "api.twitter.com", 
        port: 443, 
        path: '/oauth2/token',
        method: 'POST', 
        headers: {
            'Authorization': 'Basic WHkzV09MSWdQZTRBSWlCaEh0NEVCUFJLeDpUalUxbEVCeXFoR1M1dm5HSzAyTTl0clk5OFB5Y2JxSTA5ZlZHbUNleFBqMlZ1bXdKUQ==', 
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    }; 
    
    var postData = 'grant_type=client_credentials'; 
    var completeResponse = ''; 
    
    // Set up the request
    var postReq = https.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          //console.log('Response: ' + chunk);
          completeResponse += chunk; 
      });
      
      res.on('end', function() {
            console.log("########################################"); 
            console.log("status code: " + this.statusCode); 
            //console.log("Complete response: " + completeResponse); 
            var responseJSON = JSON.parse(completeResponse); 
            var accessToken = responseJSON.access_token; 
            
            handleAccessTokenResponse(accessToken); 
            
            
            /*execute callback*/
            //sendBackResponseToBrowser(apiResponse); 
            
      }); 
    });
    
    postReq.write(postData);
    postReq.end();
    
}

//curl -H 'Authorization: Bearer AAAAAAAAAAAAAAAAAAAAAOn%2F2AAAAAAA%2FK5ajiMUX%2B3UZ7R5yULG3sWQIIk%3D4TWghebaY5OI9jvdNIlMs12IEPPfHG16eo4MCJ2iCMZZDk9iCX' 
//https://api.twitter.com/1.1/search/tweets.json?q=birds

function getTweets(accessToken) {
    const options = {
        hostname: "api.twitter.com", 
        port: 443, 
        path: '/1.1/search/tweets.json?q=birds',
        method: 'GET', 
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }; 
    
    var completeResponse = ''; 
    
    // Set up the request
    var twitterRequest = https.request(options, function(twitterResponse) {
      twitterResponse.setEncoding('utf8');
      twitterResponse.on('data', function (chunk) {
          //console.log('Response: ' + chunk);
          completeResponse += chunk; 
      });
      
      twitterResponse.on('end', function() {
            console.log("########################################"); 
            console.log("status code: " + this.statusCode); 
            //console.log("Complete response: " + completeResponse); 
            
            var responseJSON = JSON.parse(completeResponse); 
            var tweetsList = responseJSON.statuses; 
            
            for (var i = 0; i < tweetsList.length; i++) {
                console.log("Tweet: " + tweetsList[i].text ); 
            }
            //console.log("Number of tweets: " + responseJSON.statuses.length);
            
            //console.log(responseJSON); 
            
            /*execute callback*/
            //sendBackResponseToBrowser(apiResponse); 
            
      }); 
    });
    
    twitterRequest.end();
    
}


getAccessToken(function(accessToken) {
    getTweets(accessToken); 
}); 
