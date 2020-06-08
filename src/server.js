const express = require("express");
// esse require é sinal de que ha um module.exports
const server = express();

//pegar o banco de dados
const db = require("./database/db.js");

// configurar pasta publica (use)

server.use(express.static("public"));

// habilitar o uso do req body
server.use(express.urlencoded({extended: true}));

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
    //req.query: query string da nossa url

    return res.render("create-point.html");
})

server.post("/savepoint", (req, res) => {

    // inserir dados no banco de dados
        const query = `
        INSERT INTO PLACES (
            image, 
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            console.log(err);
            return res.send("erro no cadastro");
        }
        console.log("Cadastrado com sucesso");
        console.log(this);
        return res.render("create-point.html", {saved: true});
    }
    db.run(query, values, afterInsertData )
    
})

server.get("/search", (req, res) => {
    const search = req.query.search
    if( search == "") {
        return res.render("search-results.html", {  total: 0});
    }

    //pegar os dados do banco
    //consultar dados na tabela
    db.all(`SELECT * FROM places WHERE city LIKE= '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err);
        }  
       
        const total = rows.length;
        // mostrar a pagina html com os dados do banco
        return res.render("search-results.html", { places: rows, total: total});
    })
    
})

server.listen(3000);
