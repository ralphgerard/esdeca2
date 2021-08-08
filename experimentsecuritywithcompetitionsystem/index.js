require('dotenv').config()
var winston = require('winston'),
    expressWinston = require('express-winston');
    require('winston-daily-rotate-file');
const express = require("express");
const cors = require('cors')
const config = require('./src/config/config');
const formData = require('express-form-data');
var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('key.pem');
var certificate = fs.readFileSync('cert.pem');
var credentials = {key: privateKey, cert: certificate};
//const dummyUserFn = require('./src/middlewares/dummyUserFn');

let app = express();
app.use('*', cors());

// //Multi-Factor Authentication
// const session = require('express-session')
// app.use(session({
//   secret: process.env.APP_SECRET,
//   resave: true,
//   saveUninitialized: false,
// }))

// const { ExpressOIDC } = require('@okta/oidc-middleware')
// const oidc = new ExpressOIDC({
//   issuer: `${process.env.ORG_URL}/oauth2/default`,
//   client_id: process.env.CLIENT_ID,
//   client_secret: process.env.CLIENT_SECRET,
//   redirect_uri: `${process.env.HOST_URL}/authorization-code/callback`,
//   scope: 'openid profile',
// })
// app.use(oidc.router)

// const dashboardRouter = require('./src/dashboard.js')
// app.use('/dashboard', oidc.ensureAuthenticated(), dashboardRouter)
// app.use('/logout', (req, res) => {
//   req.logout()
//   res.redirect('/')
// })


//Server Settings

// const http = require('https');
// const fs = require("fs");

// const options = {
//     key: fs.readFileSync('key.pem'),
//     cert: fs.readFileSync('cert.pem')
// };

// const requestListener = function (req, res) {

//     res.writeHead(200);
 
//    res.end('Hello, World!')
// }
// const server = http.createServer(options, requestListener);
const PORT = 5000;
const path = require("path");
const bodyParser = require("body-parser");
const bootstrap = require("./src/bootstrap");
const { fstat } = require("fs");
const { response } = require('express');

//https://github.com/ortexx/express-form-data#readme


//Parse data with connect-multiparty. 
app.use(formData.parse({}));
//Delete from the request all empty files (size == 0)
app.use(formData.format());
//Change the file objects to fs.ReadStream 
app.use(formData.stream());
//Union the body and the files
app.use(formData.union());

//Pug Template Engine
app.set("view engine", "pug");
app.set("views", path.resolve("./src/views"));

//Request Parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Not using the following because the client side will be using
//formdata technique to send data. This is due to the web application
//has file submission functionality.
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

const Speakeasy = require('speakeasy');
//speakeasy mfa
// app.post("/totp-secret",  (request, response, next) => {
//     var secret = Speakeasy.generateSecret( { length: 20});
//     response.send({ "secret": secret.base32});
// });

// app.post("/totp-generate",  (request, response, next) => {
//     response.send({ 
//         "token": Speakeasy.totp({
//             // secret: request.body.secret,
//             encoding: "base32"
//         }),
//         "remaining": (30 - Math.floor((new Date().getTime() / 1000.0 % 30)))
//     });
// });

// app.post("/totp-validate",  (request, response, next) => {
//     response.send({
//         "valid": Speakeasy.totop.verify({
//             // secret: request.body.secret,
//             encoding: "base32",
//             token: request.body.token,
//             window: 0
//         })
//     });
// });






//Express Router
const router = express.Router();
var transport = new winston.transports.DailyRotateFile({
    filename: 'application-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
  });
app.use(expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      transport
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
  }));

app.use(router);
const rootPath = path.resolve("./dist");

//All client side files are parked inside the dist directory.
//The client side files are compiled by using Gulp
//The actual code files which developers edit is at /src/assets
app.use(express.static(rootPath));
//Applied this middleware function to supply dummy user id for testing
//when I have not prepared the login functionality.
//router.use(dummyUserFn.useDummyUserForTesting); 
bootstrap(app, router);

//Index Page (Home public page)
router.get('/', (req, res, next) => {
    res.send('<html><title>Backend API system for experimenting security concept</title><body>This project provides only backend API support</body></html>');
    res.end();
});

router.use((err, req, res, next) => {
    if (err) {
        //Handle file type and max size of image
        return res.send(err.message);
    }
});






var server = app.listen(5000, function () {
  var port = server.address().port;
});