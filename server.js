var express = require('express'); 
var db = require('./db')

const PORT = 3001;

module.exports = function(){
    var app = express();
    app.set('port', PORT);

    app.get('/', function (req, res) {
        res.send('hello world');
    });
    app.get('/user', function (req, res) {

        console.log(db);
        db.push({"id":"3"});
        
        
        
        res.send(db);
    });

    return app;
}