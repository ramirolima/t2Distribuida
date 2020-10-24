//{ "name": "resource1", "hash": "xxxh", "host": "120.0.0.1" },
let resources = [
    { "name": "resource1", "hash": "xxxh", "host": "127.0.0.1:3030" },
    { "name": "resource2", "hash": "xxxh", "host": "127.0.0.1:3031" },
];

//{ "id": "ip:porta", "lastRequest": "time" },
let users = [
    { "id": "127.0.0.1:3030", "lastRequest": "time" },
    { "id": "127.0.0.1:3031", "lastRequest": "time" },

];

module.exports = { resources, users };