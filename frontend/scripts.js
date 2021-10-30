// buscar o elemento no html da minha lista onde irei inserir as vagas
const lista = document.getElementById('lista')

// atribuindo a endpoint da api do backend em um constante
const apiUrl = 'http://localhost:3000/vagas';


// faz uma resquisicao do tipo [GET] para o back que recebe todas as vagas cadastradas
const getVagas = async () => {
    // FETCH API api do javascript responsavel por fazer comunicacao entre requicoes http.
    const response = await fetch(apiUrl)
    // é a lista de objetos vagas (array de objetos)
    const vagas = await response.json();
    console.log(vagas);
    vagas.map((vaga) => {
        lista.insertAdjacentHTML('beforeend', `
        <div class="col">
            <div class="card">
            <img src="${vaga.logo}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${vaga.titulo} - ${vaga.empresa}</h5>
                <span class="badge bg-primary">${vaga.senioridade}</span>
                <p class="card-text">R$ ${vaga.salario}</p>
                <p class="card-text">${vaga.descricao}</p>
                <div>
                    <button class="btn btn-primary">Editar</button>
                    <button class="btn btn-danger">Excluir</button>
                </div>
            </div>
            </div>
        </div>
        `)
    })
}

// [POST] envia uma vaga para o backend para ser cadastrada

const submitForm = async (event) => {
    console.log('ela esta executando');
    // previnir que o navegador atualiza a pagina por causa o evento de submit
    event.preventDefault();

    // Estamos construindo um objeto com os valores que estamos pegando no input.
    const vaga = {
        titulo: titulo.value,
        empresa: empresa.value,
        logo: logo.value,
        salario: parseFloat(salario.value),
        senioridade: senioridade.value,
        descricao: descricao.value
    }
    
    // estou construindo a requisicao para ser enviada para o backend.
    const request = new Request(`${apiUrl}/add`, {
        method: 'POST',
        body: JSON.stringify(vaga),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    // chamamos a funcao fetch de acordo com as nossa configuracaoes de requisicao.
    const response = await fetch(request);
    
    const result = await response.json();
    // pego o objeto que vem do backend e exibo a msg de sucesso em um alerta.
    alert(result.message)

    clearFields();
    lista.innerHTML = '';

    getVagas();
}


// [DELETE] funcao que exclui um vaga de acordo com o seu id
const deleteVaga = async (id) => {
    // construir a requiscao de delete
    const request = new Request(`${apiUrl}/delete/${id}`, {
        method: 'DELETE'
    })

    const response = await fetch(request);
    const result = await response.json();

    alert(result.message);
    
    lista.innerHTML = '';
    getVagas();
}


// [GET] /Vaga/{id} - funcao onde recebe um id via paramtero envia uma requisicao para o backend
// e retorna a vaga de acordo com esse id.
const getVagaById = async (id) => {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
}


// ao clicar no botao editar
// ela vai preencher os campos dos inputs
// para montar o objeto para ser editado
const putVaga = async (id) => {
    // habilitando o modo de edicao
    edicao = true;

    //precismo buscar a informacao da vaga por id para popular os campos
    // salva os dados da vaga que vamos editar na variavel vaga.
    const vaga = await getVagaById(id);

    //preencher os campos de acordo com a vaga que vamos editar.
    titulo.value = vaga.titulo;
    empresa.value =  vaga.empresa;
    logo.value = vaga.logo;
    salario.value = vaga.salario;
    senioridade.value = vaga.senioridade;
    descricao.value = vaga.descricao;


}




const clearFields = () => {
    titulo.value = '';
    empresa.value = '';
    logo.value = '';
    salario.value = '';
    senioridade.value = '';
    descricao.value = '';
}

getVagas();



