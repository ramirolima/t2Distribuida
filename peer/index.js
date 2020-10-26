const fetch = require('node-fetch');

if (!process.env.PORT)
  throw Error("Variável de ambiente PORT não informada");
const port = process.env.PORT;
const sha = require('sha256');
const Peer = require("./Peer");
const peer = new Peer(port);

init()

function init() {
  new Promise(function (resolve, reject) {
      const fs = require("fs")
      const files = fs.readdirSync("./resources")
      for (let i = 0; i < files.length; i++) {
        console.log(location.hostname)
          const obj = {name:files[i]}
          fetch('http://localhost:3001/resource/', {
              method: 'POST',
              body: JSON.stringify(obj),
              headers: { 'Content-Type': 'application/json' }
          })
              .then(res => res.json())
              .then(res => console.log(res))
      }
  }).then(
    process.stdin.on('data', data => {
      console.log("buscou recurso na api")
      var hostObj = {
        host: "localhost:4001",
        name: "resource1.txt",
        hash: "hasuisdui"
      }

      peer.connectTo(hostObj.host);

      peer.onConnection = socket => {
        socket.write(hostObj.name)
      };

      peer.onData = (socket, data) => {
        
        console.log(data.toString())
    };


      
      // peer.sendData(JSON.stringify(hostObj.name.toString().replace(/\n/g, "")))
    })
  )
}
