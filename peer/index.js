if(!process.env.PORT)
  throw Error("Variável de ambiente PORT não informada");

const port = process.env.PORT;
const Peer = require("./peer");
const peer = new Peer(port);

process.argv.slice(2).forEach( otherPeerAddress => 
  peer.connectTo(otherPeerAddress) 
);