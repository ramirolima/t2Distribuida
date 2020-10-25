let fs = require ('fs');

const net = require("net");
module.exports = class Peer {
    constructor(port) {
        this.port = port;
        this.connections = [];
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
        this.connections.push(socket);

        socket.on('data', (data) =>
            this.onData(socket, data)
        );
        this.onConnection(socket);

        socket.on('close', () => {
            this.connections = this.connections.filter(conn => {
                return conn !== socket;
            })
        });
    }
    onConnection(socket) { }

    onData(socket, data) {
        // console.log("received: ", data.toString())
        this.sendData(findResource(data.toString()))
        socket.destroy()


    }
    sendData(data) {
        // console.log(this.connections[0])
        // this.connections[0].write(data)
        this.connections.forEach(socket => socket.write(data))
    }

    

    

// fs.readFile('newfile.txt', 'utf-8', function(err, contents){
//     if (err) throw err;
//     console.log(contents);
// })


}

function findResource(name) {
    console.log(name.toString())
    fs.readFile(`resources/resource1.txt`, 'utf-8', function (err, contents) {
        if (err) console.log('File not found.')

        console.log(contents)
    })
}



