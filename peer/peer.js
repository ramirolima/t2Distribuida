//Peer.js
const net = require('net');
module.exports = class Peer {
  constructor(port) {
    this.port = port;
    this.connections = [];
    const server = net.createServer( () => {
        console.log('Someone conect')
    });
    server.listen(port, () => console.log('Listening on port: ' + port) )
  }

  connectTo(address) {
    if(address.split(":").length !== 2)
        throw Error("Error: host:port ");

    const [ host, port ] = address.split(":");

    const socket = net.createConnection({ port, host }, () =>
    console.log('Connection created')
);
  } 
}