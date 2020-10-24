var express = require('express');
var { resources, users } = require('./db');
var bodyParser = require('body-parser');

const PORT = 3001;

module.exports = function () {
    var app = express();
    app.set('port', PORT);
    app.use(bodyParser.json());

    const userRequest = '127.0.0.1:3030'

    app.get('/resource', function (req, res) {
        if (isSigned(userRequest)) {
            const param = req.query.name;
            const result = resources.filter(resource => resource.name === param);
            res.send(result);
        }
        else
            res.send("Unauthorized");
    });

    app.get('/resourceAll', function (req, res) {
        if (isSigned(userRequest)) {
            res.send(resources)
        }
        else
            res.send("Unauthorized");
    });

    app.post('/resource', function (req, res) {
        if (isSigned(userRequest)) {
            resources.push(req.body);
            res.send(req.body);
        }
        else
            res.send("Unauthorized");
    });

    app.post('/signin', function (req, res) {
        users.push(req.body);
        res.send(req.body);
    });

    app.post('/signout', function (req, res) {
        if (isSigned(userRequest)) {
            const result = users.filter(user => user.id !== userRequest);
            users = result;
            res.send(true);
        }
        else
            res.send("Unauthorized");
    });

    app.get('/userAll', function (req, res) {
        if (isSigned(userRequest)) {
            res.send(users)
        }
        else
            res.send("Unauthorized");
    });

    return app;
}

function isSigned(id) {
    return (users.filter(user => user.id === id).length > 0)
}