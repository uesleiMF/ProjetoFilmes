const lista = document.getElementById('lista')

const apiUrl = 'http://localhost:3000/filmes';

let edicao = false;
let idEdicao = 0;

let nome = document.getElementById('nome');
let imagem = document.getElementById('imagem');
let genero = document.getElementById('genero');
let nota = document.getElementById('nota')
let descricao = document.getElementById('descricao');


const getFilmes = async () => {
    const response = await fetch(apiUrl)
     const filmes = await response.json();

    console.log(filmes);

      filmes.map((filme) => {
        lista.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card">
            <img src="${filme.imagem}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${filme.nome} </h5>
                <span class="badge bg-primary">${filme.genero}</span>
                <span class="badge bg-primary">${filme.nota}</span>
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






const submitForm = async (event) => {
       event.preventDefault();

     const filme = {
        nome: nome.value,
       imagem: imagem.value,
        nota: parseFloat(nota.value),
        genero: genero.value,
        descricao: descricao.value
    }
   
    if(edicao) {
        putFilme(filme, idEdicao);
    } else {
        createFilme(filme);
    }

    clearFields();
    lista.innerHTML = '';
}

const createFilme = async(filme) => {
     const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })
    const response = await fetch(request);

    const result = await response.json();
     alert(result.message)
      getFilmes();

}

const putFilme = async(filme, id) => {
     const request = new Request(`${apiUrl}/edit/${id}`, {
        method:  'PUT',
        body: JSON.stringify(filme),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

      const response = await fetch(request);

    const result = await response.json();
     alert(result.message)
    edicao = false;
    idEdicao = 0;
    getFilmes();
}

const deleteFilme = async (id) => {
     const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    
    lista.innerHTML = '';
    getFilmes();
}


const getFilmeById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}


const editFilme = async (id) => {
     edicao = true;
    idEdicao = id;

     const filme = await getFilmeById(id);

     nome.value = filme.nome;
    imagem.value = filme.imagem;
    nota.value = filme.nota;
    genero.value = filme.genero;
    descricao.value = filme.descricao;
}


const clearFields = () => {
    nome.value = '';
    imagem.value = '';
    nota.value = '';
    genero.value = '';
    descricao.value = '';
}



getFilmes();