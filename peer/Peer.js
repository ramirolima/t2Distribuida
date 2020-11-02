const fs = require("fs");
const net = require("net");

class Peer {
  constructor(port) {
    const server = net
      .createServer((socket) => {
        new Promise((resolve, reject) => {
          socket.on("data", (data) => {
            console.log("Data required> ", data.toString(), "\n");
            resolve(this.findResource(data.toString()));
          });
        })
          .then((resolve) => socket.write(resolve))
          .then((resolve) => socket.end());
      })
      .on("error", (err) => {
        console.log(err);
      });
    server.listen(port, () => {
      console.log("Server listen on", server.address().port);
    });
  }
  connectAndRequestData(address, nameOfResource) {
    if (address.split(":").length !== 2)
      throw Error("O endereço do outro peer deve ser composto por host:port ");
    const [targetHost, targetPort] = address.split(":");
    const client = net.createConnection(
      { port: targetPort, host: targetHost },
      () => {
        console.log(
          "\n\n Requiring resource to peer " + targetHost + ":" + targetPort + " \n"
        );
        console.log("Data to be required: ", nameOfResource), "\n";
        client.write(nameOfResource);
      }
    );
    client.on("data", (data) => {
      console.log("Receiving data ... \n");
      console.log("Content of resource: ", data.toString(), "\n");
      client.end();
    });
    client.on("end", () => {
      console.log("Data received. Disconecting from server... \n");
    });
  }

  findResource(name) {
    return fs.readFileSync(`resources/${name}`, "utf-8");
  }
}
module.exports = Peer;
