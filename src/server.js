const express = require("express");

const server = express();

// configurar pasta publica (use)

server.use(express.static("public"));

// __dirname é uma variavel global que nao precisa ser declarada e significa o nome do diretorio que voce esta
//ligar o servidor

//utilizando template engine

const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhas da aplicação
//get é um verbo http
server.get("/", (req, res) => {
    return res.render("index.html");
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html");
})

server.get("/search", (req, res) => {
    return res.render("search-results.html");
})


server.listen(3000);

