const express = require("express");
// esse require é sinal de que ha um module.exports
const server = express();

//pegar o banco de dados
const db = require("./database/db.js");

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
    //pegar os dados do banco
    //consultar dados na tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err);
        }  
        console.log("aqui estao seus registros");
        console.log(rows);
        // mostrar a pagina html com os dados do banco
        return res.render("search-results.html", { places: rows});
    })
    
})


server.listen(3000);

