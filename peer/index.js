const fetch = require("node-fetch");

if (!process.env.HOST) throw Error("Variável de ambiente HOST não informada");
if (!process.env.APIHOST) throw Error("Endereço de IP da API não informado")
const [host, port] = process.env.HOST.split(":");
const apiAddress = process.env.APIHOST
const sha = require("sha256");
const Peer = require("./Peer");
const peer = new Peer(port);

init();

function postResources() {
  return new Promise(function (resolve, reject) {
    const fs = require("fs");
    const files = fs.readdirSync("./resources");
    for (let i = 0; i < files.length; i++) {
      let content = fs.readFileSync(`resources/${files[i]}`, "utf-8");

      const obj = {
        name: files[i],
        hash: sha(content, "secretKey"),
        host: process.env.HOST,
      };

      fetch( `http://${apiAddress}/postResource/`, {
        method: "POST",
        body: JSON.stringify(obj),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json(), resolve())
        .catch((error) => {
          
        });
    }
  })
    .then(
      fetch(`http://${apiAddress}/resourceAll?host=${process.env.HOST}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("\nRecursos disponíveis: \n");
          console.log("------------------------");
          console.log(
            res
              .map((resource) => `${resource.name} : ${resource.host}`)
              .join([(separador = "\n")])
          );
          console.log("------------------------");
        })
    )
    .catch((error) => {});
}

function keepAlive(){
    setInterval(function(){
      fetch(
          `http://${apiAddress}/live?host=${process.env.HOST}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        )
    },5000)
}

async function init() {
  try {
    const waitPostResources = await postResources();
    keepAlive()
    process.stdin.on("data", (data) => {
      fetch(`http://${apiAddress}/resource/?name=${data.toString()}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => {
          peer.connectAndRequestData(res[0].host, res[0].name);
        });
    });
  } catch (Exception) {}
}
