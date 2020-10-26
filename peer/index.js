const fetch = require('node-fetch');

if (!process.env.HOST)
  throw Error("Variável de ambiente HOST não informada");
const [host, port] = process.env.HOST.split(":");
const sha = require('sha256');
const Peer = require("./Peer");
const peer = new Peer(port);

init()



function init() {
  new Promise(function (resolve, reject) {
      const fs = require("fs")
      const files = fs.readdirSync("./resources")
      let random = Math.ceil(Math.random()*(2));
      let cont = 0;
      for (let i = 0; i < files.length; i++) {

          console.log(random);
          let content = fs.readFileSync(`resources/${files[i]}`, 'utf-8')
          const obj = {name:files[i],
                       hash:sha(content, "secretKey"),
                       host:process.env.HOST}
          fetch('http://localhost:3001/resource/', {
              method: 'POST',
              body: JSON.stringify(obj),
              headers: { 'Content-Type': 'application/json' }
          })
              .then(res => res.json())
              .then(res => {
                  if(res === true){
                  cont++;
          }}
          )
          if (cont === random){
              console.log('passou aqui 2')
              break;
          }
      }
  }).then(
    process.stdin.on('data', data => {
      console.log("buscou recurso na api")
      var hostObj = {
        host: host,
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
