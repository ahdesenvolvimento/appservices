import { useState } from "react";
import styles from './Home.module.css';
import { Modal, Button, Container, Row, Select } from 'react-bootstrap';
import Input from "../itens/Input";
function Home() {

    const [servico, setServicos] = useState([])
    function carregarServicos() {
        window.onload = async function () {
            const response = await fetch('http://localhost:8000')
            const data = await response.json();
            setServicos(data)
        }
    }

    function carregarDados(servico){
        setTitulo(servico.titulo)
        setDescricao(servico.descricao)
        setOrcamento(servico.orcamento)
        setDataLimite(servico.data_limite)
        handleShow();
    }

    async function atualizarServico(e){
        e.preventDefault();
        const servico = {
            titulo:titulo,
            descricao:descricao,
            orcamento:orcamento,
            data_limite:data_limite,
            situacao:serv.situacao
        }
        console.log(servico)
        const init = {
            method:"PUT",
            headers:{
                "Content-Type": 'application/json'
            },
            body:JSON.stringify(servico)
        }
        console.log(serv.id)
    
        const response = await fetch('http://localhost:8000/index/'+serv.id, init)
        window.location.reload(true)
    }

    function carregarModal(e){
        handleShowTwo();
    }

    async function adicionarComentario(e){
        const comments = {
            comentario:comentario
        }
        console.log(e)
        const init = {
            method:'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(comments)
        }
        const response = await fetch('http://localhost:8000/index/comments/3', init)
        window.location.reload(true)
    }

    async function deletarServico(codigo){
        const servico = {
            id:codigo
        }
        const init = {
            method: "DELETE",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(servico)
        }

        const response = await fetch('http://localhost:8000/index/delete/' + codigo, init)
        const dados = await response.json()
        // window.location = newLocation;
        window.location.reload(true)

    }
    async function atualizarStatus(id) {
        const servico = {
            situacao: status
        }
        const init = {
            method: "PUT",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(servico)
        }

        const response = await fetch('http://localhost:8000/index/situacao/' + id, init)
        const dados = await response.json()
        // window.location = newLocation;
        window.location.reload(true)

    }

    async function ordernar(){
        const ordernar = {
            order:order
        }
        const init = {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(ordernar)
        }
        const response = await fetch('http://localhost:8000/index/order/', init)
        const data = await response.json();
        setServicos(data)
    }
    const [show, setShow] = useState(false);

    const [showTwo, setShowTwo] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleShowTwo = () => setShowTwo(true);
    const handleCloseTwo = () => setShowTwo(false);

    const [titulo, setTitulo] = useState()
    const [descricao, setDescricao] = useState()
    const [orcamento, setOrcamento] = useState()
    const [data_limite, setDataLimite] = useState()
    const [comentario, setComentario] = useState()
    carregarServicos()
    const [status, setStatus] = useState();
    const [serv, setServico] = useState([]);

    const [order, setOrder] = useState();
    return (
        <div>
            <Modal show={show} onHide={handleClose} centered size="lg" animation={true} style={{opacity:1}}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Titulo</label>
                    <input type="text" name="titulo" id="titulo" onChange={(e) => setTitulo(e.target.value)} className="form-control" defaultValue={serv.titulo ||''} />

                    <label>Descrição</label>
                    <input type="text" name="descricao" id="descricao" onChange={(e) => setDescricao(e.target.value)} className="form-control" defaultValue={serv.descricao} />

                    <label>Orçamento</label>
                    <input type="text" name="orcamento" id="orcamento" onChange={(e) => setOrcamento(e.target.value)} className="form-control" defaultValue={serv.orcamento} />

                    <label>Data limite</label>
                    <input type="date" name="data_limite" id="data_limite" onChange={(e) => setDataLimite(e.target.value)} className="form-control" defaultValue={serv.data_limite} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={atualizarServico}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showTwo} onHide={handleCloseTwo} centered size="lg" animation={true} style={{opacity:1}}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>Comentário</label>
                    <input type="text" name="comentario" id="comentario" onChange={(e) => setComentario(e.target.value)} className="form-control" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseTwo}>
                        Fechar
                    </Button>
                    <Button variant="primary" onClick={(e) => adicionarComentario(serv.id)}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container style={{backgroundColor: '#f1f1f1'}}>
                <select name="order_by" id="" className="form-control" onChange={(e) => setOrder(e.target.value)}>
                    <option value="">Ordenar</option>
                    <option value="data_cadastro">Data de cadastro</option>
                    <option value="orcamento">Orçamento</option>
                </select>
                <Button type="button" onClick={(e) => ordernar()} className="btn btn-primary">Ordenar</Button>
                {servico.map((servico) => (
                    <div className={styles.card} key={servico.id}>
                        <h1 className={styles.titulo}>{servico.titulo}</h1>
                        <p>{servico.descricao}</p>
                        <p>R$ {servico.orcamento}</p>
                        <p>Data limite: {servico.data_limite}</p>
                        <p>Data de cadastro: {servico.data_cadastro}</p>
                        <p>Situação: <select name="status" id="" className="form-control" onChange={(e) => setStatus(e.target.value)}>
                            <option value="DEFAULT">{servico.situacao}</option>
                            <option value="Aberto">Aberto</option>
                            <option value="Cancelado">Cancelado</option>
                            <option value="Concluído">Concluído</option>
                        </select>
                        </p>
                        <p>Comentários: {servico.cometarios}</p>
                        <Button type="submit" className="btn btn-primary margin" onClick={(e) => atualizarStatus(servico.id)}>Alterar Status</Button>
                        <Button type="button" className="btn btn-primary margin" onClick={(e) => {carregarDados(servico); setServico(servico);}}>Editar Serviço</Button>
                        <Button type="button" className="btn btn-primary margin" onClick={(e) => carregarModal(servico.id)}>Adicionar Comentário</Button>
                        <Button type="button" className="btn btn-primary margin" onClick={(e) => deletarServico(servico.id)}>Deletar</Button>
                    </div>
                ))}
            </Container>
        </div>
    )
}

export default Home