var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var fs=require('fs');
const FACEBOOK_ACCESS_TOKEN = 'EAAEWihjxxmgBAGPW3iDD4t7lq0HCPGohnzmuXaclOZBX22hwCqAtfb7Y1vNibuSUtwyWeVZCnx8NsZC8szAuc6LkFbN7kc7fmWMfsmQQQdrm7up15YpN7sHDOblOLO3jnk8bCWVqp0MfFSanV5T89qdiqtElhnPFoiv9YZCzSQZDZD';
const fburl='https://graph.facebook.com/v2.6/';
const request = require('request');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", function (req, res) {
fs.writeFileSync("./app.json",JSON.stringify(req.body),'utf8');
var sender_id=req.body.originalRequest.data.sender.id;
var rec_id=req.body.originalRequest.data.recipient.id;

    if (req.body.result.action == "greeting") {
        if (req.body.result.resolvedQuery == "hi") {
         request({
            uri: fburl+sender_id+"?access_token="+FACEBOOK_ACCESS_TOKEN,
            methos: 'GET'
        }, (err, response, body) => {
            let bodys=JSON.parse(body);
          return res.json({
                speech:"Welcome, "+bodys.first_name+" "+bodys.last_name,
                displayText: "Welcome, "+bodys.first_name+" "+bodys.last_name,
                source: 'agent'
            });
        });
       
              
            
        }

    }
});

app.get("/getdata/",function(req, res){
   fs.readFile("./app.json",'utf-8',function(err,data){
      res.json(data);
   });
   
});
app.listen(process.env.PORT || 3000, function (message) {
    console.log("Server is running on the port...");
})
