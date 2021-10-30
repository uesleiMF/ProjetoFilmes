const express = require('express');
const router = express.Router();

const filmes = [
    {
        id: Date.now(),
        nome: 'MISSÃO RESGATE',
        imagem: 'https://capas-p.imagemfilmes.com.br/164002_000_p.jpg',
        nota: '10',
        genero: 'AÇÃO',
        descricao: 'Depois que uma distante mina de diamantes desmorona na região norte do Canadá, um motorista de caminhão (Liam Neesom) faz o impossível para conseguir atravessar o gelo e resgatar com vida os minerados soterrados durante o acidente. Mas as condições climáticas pioram a cada minuto, tornando a missão cada vez mais difícil.'
    },

    {
        id: Date.now(),
        nome: 'HELLBOY',
        imagem: 'https://capas-p.imagemfilmes.com.br/164781_000_p.jpg',
        nota: '9',
        genero: 'AÇÃO,COMEDIA',
        descricao: 'Nimue (Milla Jovovich), a Rainha de Sangue, foi uma bruxa tão poderosa que nenhum mortal jamais conseguiu derrotá-la. Durante uma batalha, seu corpo foi dividido em seis partes e espalhado pelos lugares mais distantes da Terra. Séculos depois, um massacre num mosteiro próximo à Londres levanta a suspeita de que alguém pode estar querendo ressuscitá-la e Hellboy (David Harbour) recebe a missão de conter essa terrível ameaça.'
    },

]

router.get('/', (req, res) => {
    res.send(filmes);
})

router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);

       if(!filme) {
        res.status(404).send({error: 'Filme nao encontrado'});
        return;
    }

    res.send(filme);
})

router.post('/add', (req, res) => {
     const filme = req.body;

   

    if(!filme || !filme.nome || !filme.nota || !filme.imagem || !filme.genero) {
        res.status(400).send({
            message: 'Filme inválido, esta faltando o preenchimento de alguns campos'
        })
        return;
    }
    
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
        message: 'Filme Cadastrado com sucesso',
        data: filme
    });
})

router.put('/edit/:id', (req, res) => {
       const filmeEdit = req.body;
      const idParam = req.params.id;
     let index = filmes.findIndex(filme => filme.id == idParam);

    if(index < 0) {
        res.status(404).send({
            error: 'O filme que voce está tentando editar nao foi encontrado'
        })
        return;
    }

        filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }

    res.send({
        message: `filme ${filmes[index].nome} atualizado com sucesso`,
        data: filmes[index]
    })
})


router.delete('/delete/:id', (req, res) => {
    const idParam = req.params.id;
    const index = filmes.findIndex(filme => filme.id == idParam);
    const nome = filmes[index];
        filmes.splice(index, 1);
    res.send({
        message: `filme ${nome.nome} excluido com sucesso !`,
    })
})


module.exports = router;