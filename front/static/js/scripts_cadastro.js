const cadastrarServico = async (e) => {
    // e.preventDefault();
    const titulo = document.getElementById('titulo');
    const descricao = document.getElementById('descricao');
    const orcamento = document.getElementById('orcamento');
    const data_limite = document.getElementById('data_limite');
    const situacao = document.getElementById('situacao')

    // const buttonEdit = document.getElementById('buttonEdit');
    const servico = {
        titulo:titulo.value,
        descricao:descricao.value,
        orcamento:orcamento.value,
        data_limite:data_limite.value,
        situacao:situacao.value
    }
    const init = {
        method:"POST",
        headers:{
            "Content-Type": 'application/json'
        },
        body:JSON.stringify(servico)
    }

    const response = await fetch('http://localhost:8000/', init)
    const dados = await response.json()
}
   