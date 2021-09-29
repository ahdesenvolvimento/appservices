const carregarServicos = async () => {
    const response = await fetch('http://localhost:8000/');
    const data = await response.json();
    
    data.forEach(element => {
        const section = document.getElementById('section-services');
        const services = document.getElementById('services');
        const service = document.importNode(services.content, true);
        const itens_service = service.querySelectorAll('p');
        const buttons = service.querySelectorAll('button');
        buttons[0].setAttribute('id', element.id);
        buttons[1].setAttribute('id_comentario', element.id);
        itens_service[0].innerText = "Titulo: "+element.titulo;
        itens_service[1].innerText = "Descrição: "+element.descricao;
        itens_service[2].innerText = "Orçamento: "+ element.orcamento;
        itens_service[3].innerText = "Data cadastro: " + element.data_cadastro;
        itens_service[4].innerText = "Data limite: " + element.data_limite;
        itens_service[5].innerText = "Situação: " + element.situacao;
        itens_service[6].innerText = "Comentários: " + element.cometarios;
        // buttons.setAttribute('id', element.id);
        section.append(service);
        // itens_service[0].innerText ='312312';

    });
}
const openModal = async (e) =>{
    const response = await fetch('http://localhost:8000/index/'+e.target.id);
    const data = await response.json();
    const inputs = document.getElementsByTagName('input');
    const select = document.getElementById('situacao');
    
    const buttonEdit = document.getElementById('buttonEdit')
    buttonEdit.setAttribute('id_edit', e.target.id);
    data.forEach(element => {
        if (element.situacao == 'Concluído'){
            select.selectedIndex = '2';
        }else if (element.situacao == 'Cancelado'){
            select.selectedIndex = '3';
        }else{
            select.selectedIndex = '1';
        }
        inputs[0].value = element.titulo
        inputs[1].value = element.descricao
        inputs[2].value = element.orcamento
        inputs[3].value = element.data_limite
        
    })
    var myModal = new bootstrap.Modal(document.getElementById('modalEdit'), {
        keyboard: false
    })
    myModal.show()
}

const openModalComment = async (e) =>{
    id = e.target.getAttribute('id_comentario');
    const response = await fetch('http://localhost:8000/index/comments/'+id);
    const data = await response.json();
    const input = document.getElementById('comentario');
    
    const buttonEdit = document.getElementById('buttonComment')
    buttonEdit.setAttribute('id_comment', id);
    var myModal = new bootstrap.Modal(document.getElementById('modalComment'), {
        keyboard: false
    })
    myModal.show()
}

const adicionarComentario = async () => {
    const comentario = document.getElementById('comentario');

    const buttonComment = document.getElementById('buttonComment');
    const servico = {
        comentario:comentario.value,
    }
    console.log(buttonComment)
    const init = {
        method:"PUT",
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify(servico)
    }

    const response = await fetch('http://localhost:8000/index/comments/'+buttonComment.getAttribute('id_comment'), init)
    const dados = await response.json()
}

const atualizarDados = async () => {
    const titulo = document.getElementById('titulo');
    const descricao = document.getElementById('descricao');
    const orcamento = document.getElementById('orcamento');
    const data_limite = document.getElementById('data_limite');
    const situacao = document.getElementById('situacao')

    const buttonEdit = document.getElementById('buttonEdit');
    const servico = {
        titulo:titulo.value,
        descricao:descricao.value,
        orcamento:orcamento.value,
        data_limite:data_limite.value,
        situacao:situacao.value
    }
    const init = {
        method:"PUT",
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify(servico)
    }

    const response = await fetch('http://localhost:8000/index/'+buttonEdit.getAttribute('id_edit'), init)
    const dados = await response.json()
}



window.onload = function(){
    const container = document.getElementById('section-services');
    carregarServicos();
}