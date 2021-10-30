// buscar o elemento no html da minha lista onde irei inserir as vagas
const lista = document.getElementById('lista')

// atribuindo a endpoint da api do backend em um constante
const apiUrl = 'http://localhost:3000/filmes';

// modo edicao e id edicao
let edicao = false;
let idEdicao = 0;

// pegar os dados que o usuario digita no input (Elementos)
let nome = document.getElementById('nome');
let imagem = document.getElementById('imagem');
let salario = document.getElementById('salario');
let senioridade = document.getElementById('senioridade');
let descricao = document.getElementById('descricao');


// faz uma resquisicao do tipo [GET] para o back que recebe todas as vagas cadastradas
const getFilmes = async () => {
    // FETCH API api do javascript responsavel por fazer comunicacao entre requicoes http.
    // faz uma requisicao [GET] para o backend na url http://localhost:3000/vagas
    const response = await fetch(apiUrl)
    // é a lista de objetos vagas (array de objetos)
    const filmes = await response.json();

    console.log(filmes);

    // a gente pega o resultado da api(um array de objetos com as vagas) e itera essa lista com o map
    // algo parecido com um for.
    filmes.map((filme) => {
        lista.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card">
            <img src="${filme.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${filme.nome} </h5>
                <span class="badge bg-primary">${filme.senioridade}</span>
                <p class="card-text">R$ ${filme.salario}</p>
                <p class="card-text">${filme.descricao}</p>
                <div>
                    <button class="btn btn-primary" onclick="editFilme('${filme.id}')">Editar</button>
                    <button class="btn btn-danger" onclick="deleteFilme('${filme.id}')">Excluir</button>
                </div>
            </div>
            </div>
        </div>
        `)
    })
}

// [POST] envia uma vaga para o backend para ser cadastrada

const submitForm = async (event) => {
    // previnir que o navegador atualiza a pagina por causa o evento de submit
    event.preventDefault();

    // Estamos construindo um objeto com os valores que estamos pegando no input.
    const filme = {
        nome: nome.value,
       imagem: imagem.value,
        salario: parseFloat(salario.value),
        senioridade: senioridade.value,
        descricao: descricao.value
    }
    // é o objeto preenchido com os valores digitados no input

    if(edicao) {
        putFilme(filme, idEdicao);
    } else {
        createFilme(filme);
    }

    clearFields();
    lista.innerHTML = '';
}

const createFilme = async(filme) => {
    // estou construindo a requisicao para ser enviada para o backend.
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
    const response = await fetch(request);

    const result = await response.json();
    // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
    alert(result.message)
    // vaga cadastrada com sucesso.
    getFilmes();

}

const putFilme = async(filme, id) => {
    // estou construindo a requisicao para ser enviada para o backend.
    const request = new Request(`${apiUrl}/edit/${id}`, {
        method:  'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
    const response = await fetch(request);

    const result = await response.json();
    // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
    alert(result.message)
    edicao = false;
    idEdicao = 0;
    getFilmes();
}


// [DELETE] funcao que exclui um vaga de acordo com o seu id
const deleteFilme = async (id) => {
    // construir a requiscao de delete
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    
    lista.innerHTML = '';
    getFilmes();
}


// [GET] /Vaga/{id} - funcao onde recebe um id via paramtero envia uma requisicao para o backend
// e retorna a vaga de acordo com esse id.
const getFilmeById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}


// ao clicar no botao editar
// ela vai preencher os campos dos inputs
// para montar o objeto para ser editado
const editFilme = async (id) => {
    // habilitando o modo de edicao e enviando o id para variavel global de edicao.
    edicao = true;
    idEdicao = id;

    //precismo buscar a informacao da vaga por id para popular os campos
    // salva os dados da vaga que vamos editar na variavel vaga.
    const filme = await getFilmeById(id);

    //preencher os campos de acordo com a vaga que vamos editar.
    nome.value = filme.nome;
    imagem.value = filme.imagem;
    salario.value = filme.salario;
    senioridade.value = filme.senioridade;
    descricao.value = filme.descricao;
}


const clearFields = () => {
    nome.value = '';
    imagem.value = '';
    salario.value = '';
    senioridade.value = '';
    descricao.value = '';
}

getFilmes();