import { useState } from "react";
import Input from "../itens/Input";
import { Container, Button } from "react-bootstrap";
import Select from "../itens/Select";
function Create() {

    const cadastrarServico = async (e) => {
        e.preventDefault();
        const servico = {
            titulo:titulo,
            descricao:descricao,
            orcamento:orcamento,
            data_limite:data_limite,
            situacao:situacao
        }
        console.log(servico);
        const init = {
            method:"POST",
            headers:{
                "Content-Type": 'application/json'
            },
            body:JSON.stringify(servico)
        }
    
        const response = await fetch('http://localhost:8000/', init)
        window.location.reload(true)
        // const dados = await response.json()
    }
    const [titulo, setTitulo] = useState()
    const [descricao, setDescricao] = useState()
    const [orcamento, setOrcamento] = useState()
    const [data_limite, setDataLimite] = useState()
    const [situacao, setSituacao] = useState()
    return (
        <div>
            <Container>
                <form action="" method="POST">
                    <div className="col-md-12 mb-3">
                        <Input 
                            type="text"
                            text="Título"
                            name="titulo"
                            placeholder="Título do serviço"
                            className='form-control'
                            handleOnChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <Input 
                            type="text"
                            text="Descriçao"
                            name="descricao"
                            placeholder="Descrição do serviço"
                            className='form-control'
                            handleOnChange={(e) => setDescricao(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <Input 
                            type="text"
                            text="Orçamento"
                            name="orcamento"
                            placeholder="Orçamento do serviço"
                            className='form-control'
                            handleOnChange={(e) => setOrcamento(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <Input 
                            type="date"
                            text="Data limite"
                            name="data_limite"
                            placeholder="Data limite do serviço"
                            className='form-control'
                            handleOnChange={(e) => setDataLimite(e.target.value)}
                        />
                    </div>
                    <div className="col-md-12 mb-3">
                        <Select text="Situação"
                            name="situacao"
                            className="form-control"
                            handleOnChange={(e) => setSituacao(e.target.value)}
                            id="situacao" />
                    </div>
                    <div className="col-md-12 mb-3">
                        <Button type="button" onClick={cadastrarServico} className="btn btn-primary w-100">Salvar</Button>
                    </div>
                </form>
            </Container>
        </div>
    )
}

export default Create