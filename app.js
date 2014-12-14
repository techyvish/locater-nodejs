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

app.set('port', process.env.PORT || 4300 );

app.use ( connection(mysql,{
    host:'localhost',
    port:3306,
    user:'root',
    password:'',
    database:'locater'
},'pool'));

/*
 will call every time for incoming requests
 */
app.use(function (req, res, next) {
    console.log('Time: %d', Date.now());
    next();
})

app.get('/',indexroute.index);
app.get('/customers', customerroutes.list);

http.createServer(app).listen( app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});