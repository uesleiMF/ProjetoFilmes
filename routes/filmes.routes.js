const express = require('express');
// inicializar as rotas do express
const router = express.Router();

const filmes = [
    {
        id: Date.now(),
        nome: 'desenvolvedor front-end',
        imagem: 'https://media-exp1.licdn.com/dms/image/C4E0BAQET4zubIYEjJQ/company-logo_200_200/0/1625249003866?e=2159024400&v=beta&t=AL_GUba4oxMd6gw0PcXSx3EpyI0F4bm5cBWF1m7OLSg',
        salario: '3000',
        senioridade: 'junior',
        descricao: 'vaga de dev front-end xyz bla bla bla'
    },
]

// [GET] /vagas - Retornar uma lista de vagas
router.get('/', (req, res) => {
    res.send(filmes);
})

// [GET] /vagas/{id} - Retornar uma unica vaga por id.
router.get('/:id', (req, res) => {
    const idParam = req.params.id;
    const filme = filmes.find(filme => filme.id == idParam);

    // verifica se a vaga nao foi encontrada
    if(!filme) {
        res.status(404).send({error: 'Vaga nao encontrada'});
        return;
    }

    res.send(filme);
})

// [POST] /vagas/add - Cadastro de uma nova vaga
router.post('/add', (req, res) => {
    // recebi o objeto da vaga para cadastar vinda do cliente (via requisicao http POST)
    const filme = req.body;

    // validacao se existe os campos

    if(!filme || !filme.nome || !filme.salario || !filme.imagem || !filme.salario) {
        res.status(400).send({
            message: 'vaga inválida, esta faltando os campos titulo e salario'
        })
        return;
    }
    
    filme.id = Date.now();
    filmes.push(filme);
    res.status(201).send({
        message: 'Cadastro com sucesso',
        data: filme
    });
})

// [PUT] /vagas/edit/{id} - Edita uma vaga de acordo com o seu id e objeto recebido
router.put('/edit/:id', (req, res) => {
    // o objeto que veio do front para atualizar a vaga com o id recebido
    const filmeEdit = req.body;
    // o id recebido via parametro
    const idParam = req.params.id;
    // procura o indice da vaga pre cadastrada na lista de acordo com o id recebido para atualizala
    let index = filmes.findIndex(filme => filme.id == idParam);

    if(index < 0) {
        res.status(404).send({
            error: 'a vaga que voce está tentando editar nao foi encontrada'
        })
        return;
    }

    // spread operator ...
    // faz um espelho do item na lista e um espelho do objeto atualizado e junta os 2
    filmes[index] = {
        ...filmes[index],
        ...filmeEdit
    }

    res.send({
        message: `filme ${filmes[index].titulo} atualizada com sucesso`,
        data: filmes[index]
    })
})

// [DELETE] /vagas/delete/{id} = exclui um item da lista de acordo com o seu id

router.delete('/delete/:id', (req, res) => {
    // acessamos o id recebido via parametro
    const idParam = req.params.id;

    const index = filmes.findIndex(filme => filme.id == idParam);
    const nome = filmes[index];
    //excluimos a vaga da lista de acordo com o seu indice.
    filmes.splice(index, 1);
    res.send({
        message: `filme ${nome.titulo} excluida com sucesso !`,
    })
})

// exporta as rotas para serem usadas no index.
module.exports = router;