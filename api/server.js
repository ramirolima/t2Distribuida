var express = require('express');
var { resources, users } = require('./db');
var bodyParser = require('body-parser');

const PORT = 3001;

module.exports = function () {
    var app = express();
    app.set('port', PORT);
    app.use(bodyParser.json());

    app.post('/postResource', function (req, res) {
        if (validateResource(req.body.name)) {
            if (validateQuantity(req.body.host)) {
                resources.push(req.body);
                res.send(true);
            }
        }
        else
            res.send(false);
    });

    app.get('/resource', function (req, res) {
        res.send(resources.filter(resource => resource.name === req.query.name));
    });

    app.get('/resourceAll', function (req, res) {
        return res.send(resources.filter(resource => resource.host !== req.query.host))
    });

    app.get('/live', function (req, res) {
        console.log('a fazer')
    })

    return app;
}

function validateResource(name) {
    return (resources.filter(resource => resource.name === name).length === 0)
}

function validateQuantity(host) {
    return (resources.filter(resource => resource.host === host).length < 2)
}