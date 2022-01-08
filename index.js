var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

var routes = require("./routes/index");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');    // Request headers you wish to allow
  // Pass to next layer of middleware
  next();
});

app.use('/', routes);

app.listen(process.env.PORT || 3000,function(req,res){
  console.log("Server Started!!");
});