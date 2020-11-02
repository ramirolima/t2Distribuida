var express = require("express");
var { resources, hostsAlive } = require("./db");
var bodyParser = require("body-parser");

const PORT = 3001;

module.exports = function () {
  var app = express();
  app.set("port", PORT);
  app.use(bodyParser.json());

  app.post("/postResource", function (req, res) {
    if (validateResource(req.body.name)) {
      if (validateQuantity(req.body.host)) {
        resources.push(req.body);
        res.send(true);
      }
    } else res.send(false);
  });

  app.get("/resource", function (req, res) {
    res.send(resources.filter((resource) => resource.name === req.query.name));
  });

  app.get("/resourceAll", function (req, res) {
    return res.send(
      resources.filter((resource) => resource.host !== req.query.host)
    );
  });

  app.get("/live", function (req, res) {
    const liveTime = new Date().getTime();
    console.log(req.query.host, "está vivo");
    if (validateHost(req.query.host)) {
      hostsAlive.push({ host: req.query.host, queryTime: liveTime });
      return res.status(200).send();
    } else {
      const host = hostsAlive.find((host) => host.host == req.query.host);
      host.queryTime - liveTime <= 20000 ? "" : removeHost(host);
      host.queryTime = liveTime;
      return res.status(200).send();
    }
  });

  return app;
};

function validateResource(name) {
  return resources.filter((resource) => resource.name === name).length === 0;
}
function validateHost(host) {
  return hostsAlive.filter((hostALive) => hostALive.host === host).length === 0;
}

function removeHost(host) {
  let object = resources.filter((resource) => resource.host === host.host);
  object.forEach(resource => {
      resources.splice(resources.indexOf(resource),1)
  })
}

function validateQuantity(host) {
  return resources.filter((resource) => resource.host === host).length < 2;
}
