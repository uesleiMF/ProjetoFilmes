const express = require('express');
const router = express.Router();


const filmes = [
    {
        id: Date.now(),
        nome: 'MISSÃO RESGATE',
        imagem: 'https://capas-p.imagemfilmes.com.br/164002_000_p.jpg',
        nota: '10',
        genero: 'AÇÃO',
        descricao: 'Depois que uma distante mina de diamantes desmorona na região norte do Canadá, um motorista de caminhão (Liam Neesom) faz o impossível para....'
    },

    {
        id: Date.now(),
        nome: 'OS PARÇAS 2',
        imagem: 'https://s2.glbimg.com/fv5sdc8t4HNICs4HJ6XrG29Qen0=/362x536/https://s2.glbimg.com/a7TZq-tnBcgDU2IM_nJoiERaaOI=/i.s3.glbimg.com/v1/AUTH_c3c606ff68e7478091d1ca496f9c5625/internal_photos/bs/2021/k/p/N5UmBtTIWRlkkemtfM4w/2021-019-os-parcas-2-poster.jpg',
        nota: '9',
        genero: 'COMEDIA',
        descricao: 'Toinho, Ray Van e Pilôra acham que estão feitos após aplicarem um golpe, mas tudo dá errado. Para se livrarem de uma roubada, precisam....'
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


    if(!filme || !filme.nome || !filme.nota || !filme.imagem || !filme.nota) {
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
    const name = filmes[index];
        filmes.splice(index, 1);
    res.send({
        message: `filme ${name.nome} excluido com sucesso !`,
    })
})


module.exports = router;