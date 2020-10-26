let fs = require('fs');

const net = require("net");
module.exports = class Peer {
    constructor(port) {
        this.port = port;
        const server = net.createServer((socket) => {
            this.onSocketConnected(socket)
        });
        server.listen(port, () => console.log("Ouvindo porta " + port))
    }
    connectTo(address) {
        if (address.split(":").length !== 2)
            throw Error("O endereço do outro peer deve ser composto por host:port ");
        const [host, port] = address.split(":");

        const socket = net.createConnection({ port, host }, () =>
            this.onSocketConnected(socket)
        );
    }
    onSocketConnected(socket) {
        socket.on('data', (data) => {
            console.log("recebi:", data.toString())
            this.onData(socket, data)
        })
        
        this.onConnection(socket);
    }
    onConnection(socket) { }

    onData(socket, data) {
        console.log("Solicitação respondida!")
        socket.write(findResource(data.toString()))
        socket.destroy()
    }
}

function findResource(name) {
    return fs.readFileSync(`resources/${name}`, 'utf-8')
}



