// Backend - Projeto vagas
// importacao das libs externas (express e cors)
const express = require('express');
const cors = require('cors');

// importar as rotas que eu vou ultilizar
const filmesRouter = require('./routes/filmes.routes');

// inicializacao do express
const app = express();


// habilitar o modo json do express; JSON (Javascript Objective Notation)
app.use(express.json());

// habilitar o midleware do cors
app.use(cors());

//inicializar a rota /vagas de acordo com as configuracoes no meu arquivo de rotas
app.use('/filmes', filmesRouter);



const port = 3000;
app.listen(port, () => {
    console.log(`Servidor rodando na porta http://localhost:${port}`);
})