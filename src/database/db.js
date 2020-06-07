// importar a dependencia do sqlite3
const sqlite3 = require("sqlite3").verbose();

// iniciar o objeto de banco de dados

const db =  new sqlite3.Database("./src/database/database.db");

// utilizar o objeto de banco de dados para operações

db.serialize(() => {
    // criar tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)
    // //inserir dados na tabela
    // const query = `
    //     INSERT INTO PLACES (
    //         image, 
    //         name,
    //         address,
    //         address2,
    //         state,
    //         city,
    //         items
    //     ) VALUES (?,?,?,?,?,?,?);
    // `
    // const values = [
    //     "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    //     "papersider",
    //     "guilherme gemballa, jardim america",
    //     "nº 260",
    //     "Santa Catarina",
    //     "Rio do Sul",
    //     "Resíduos eletrônicos, lâmpadas"
    // ]

    // function afterInsertData(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log("Cadastrado com sucesso");
    //     console.log(this);
    // }
    // db.run(query, values, afterInsertData )

    //consultar dados na tabela
    // db.all(`SELECT name FROM places`, function(err, rows) {
    //     if(err) {
    //         return console.log(err);
    //     }  
    //     console.log("aqui estao seus registros");
    //     console.log(rows);
    // })
    
    //deletar dados
    // db.run(`DELETE FROM places WHERE ID = ?`, [1], function(err) {
    //     if(err) {
    //         return console.log(err);
    //     }
    //     console.log("registro deletado com sucesso");
    //     console.log(rows);
    // });
});

module.exports = db;