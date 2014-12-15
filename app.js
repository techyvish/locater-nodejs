/**
 * Created by Vishal on 14/12/14.
 */
var express = require('express');
var customerroutes = require('./routes/customer.js');
var indexroute = require('./routes/index.js');
var http = require('http');
var path = require('path');


var app = express();

var connection = require('express-myconnection');
var mysql = require('mysql');

var db_config_prod = {
    host: 'us-cdbr-iron-east-01.cleardb.net',
    user: 'b8413f8c3593d4',
    password: '201bfd3e',
    database: 'heroku_5c6959e8187b7ef'
};

var db_config_dev = {
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'locater'
};

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.set('port', process.env.PORT || 4300 );

app.use ( connection(mysql,db_config_dev,'pool'));

/*
 will call every time for incoming requests
 */
app.use(function (req, res, next) {
    console.log('Time: %d', Date.now());
    next();
})

app.get('/',indexroute.index);
app.get('/customers', customerroutes.list);
app.post('/customers/add', customerroutes.save);

http.createServer(app).listen( app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});