import { useState, useEffect } from "react";
// import styles from "./Home.module.css";
import { Modal, Button, Container } from "react-bootstrap";
// import Input from "../itens/Input";
import Main from "./Main";
import Servicos from "../components/Servicos";
function Home() {
  const [show, setShow] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();
  const [orcamento, setOrcamento] = useState();
  const [data_limite, setDataLimite] = useState();
  const [comentario, setComentario] = useState();
  const [servico, setServicos] = useState([]);
  const [serv, setServico] = useState([]);
  const [order, setOrder] = useState();

  const handleClose = () => setShow(false);
  const handleCloseTwo = () => setShowTwo(false);
  useEffect(() => {
    carregarServicos();
  }, []);

  async function carregarServicos() {
      const response = await fetch("http://localhost:8000");
      const data = await response.json();
      setServicos(data);
  }

  async function atualizarServico(e) {
    e.preventDefault();
    const servico = {
      titulo: titulo,
      descricao: descricao,
      orcamento: orcamento,
      data_limite: data_limite,
      situacao: serv.situacao,
    };
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(servico),
    };

    await fetch("http://localhost:8000/index/" + serv.id, init);
    window.location.reload(true);
  }

  async function adicionarComentario(e) {
    const comments = {
      comentario: comentario,
    };
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comments),
    };
    await fetch("http://localhost:8000/index/comments/3", init);
    window.location.reload(true);
  }

  async function ordernar() {
    const ordernar = {
      order: order,
    };
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ordernar),
    };
    const response = await fetch("http://localhost:8000/index/order/", init);
    const data = await response.json();
    setServicos(data);
  }

  const content = (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        animation={true}
        style={{ opacity: 1 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Titulo</label>
          <input
            type="text"
            name="titulo"
            id="titulo"
            onChange={(e) => setTitulo(e.target.value)}
            className="form-control"
            defaultValue={serv.titulo || ""}
          />

          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            id="descricao"
            onChange={(e) => setDescricao(e.target.value)}
            className="form-control"
            defaultValue={serv.descricao}
          />

          <label>Orçamento</label>
          <input
            type="text"
            name="orcamento"
            id="orcamento"
            onChange={(e) => setOrcamento(e.target.value)}
            className="form-control"
            defaultValue={serv.orcamento}
          />

          <label>Data limite</label>
          <input
            type="date"
            name="data_limite"
            id="data_limite"
            onChange={(e) => setDataLimite(e.target.value)}
            className="form-control"
            defaultValue={serv.data_limite}
          />
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

      <Modal
        show={showTwo}
        onHide={handleCloseTwo}
        centered
        size="lg"
        animation={true}
        style={{ opacity: 1 }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>Comentário</label>
          <input
            type="text"
            name="comentario"
            id="comentario"
            onChange={(e) => setComentario(e.target.value)}
            className="form-control"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTwo}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={(e) => adicionarComentario(serv.id)}
          >
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
      <Container style={{ backgroundColor: "#f1f1f1" }}>
        <select
          name="order_by"
          id=""
          className="form-control"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="">Ordenar</option>
          <option value="data_cadastro">Data de cadastro</option>
          <option value="orcamento">Orçamento</option>
        </select>
        <Button
          type="button"
          onClick={(e) => ordernar()}
          className="btn btn-primary"
        >
          Ordenar
        </Button>
        <Servicos
          dados={servico}
          setTitulo={setTitulo}
          setDescricao={setDescricao}
          setOrcamento={setOrcamento}
          setDataLimite={setDataLimite}
          setComentario={setComentario}
          setShow={setShow}
          setShowTwo={setShowTwo}
          setServico={setServico}
        />
      </Container>
    </div>
  );

  return <Main content={content} />;
}

export default Home;
