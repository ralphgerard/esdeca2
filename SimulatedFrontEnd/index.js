
const express=require('express');
const serveStatic=require('serve-static');
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('key.pem');
var certificate = fs.readFileSync('cert.pem');
var credentials = {key: privateKey, cert: certificate};

var hostname="54.172.72.66";
// var port=3001;


var app=express();


app.use(function(req,res,next){
    console.log(req.url);
    console.log(req.method);
    console.log(req.path);
    console.log(req.query.id);
    //Checking the incoming request type from the client
    if(req.method!="GET"){
        res.type('.html');
        var msg='<html><body>This server only serves web pages with GET request</body></html>';
        res.end(msg);
    }else{
        next();
    }
});


app.use(serveStatic(__dirname+"/public"));


app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});

var httpsServer = https.createServer(credentials, app);

// app.listen(port,hostname,function(){

//     console.log(`Server hosted at http://${hostname}:${port}`);
// });


var server = app.listen(3001, function () {
  var port = server.address().port;
});