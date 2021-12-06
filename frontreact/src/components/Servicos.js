import styles from "../pages/Home.module.css";
import { useState } from "react";
import { Button } from "react-bootstrap";
const Servicos = ({
  dados,
  setTitulo,
  setDescricao,
  setOrcamento,
  setDataLimite,
  setComentario,
  setShow,
  setShowTwo,
  setServico,
  setId
}) => {
  const [status, setStatus] = useState();
  const handleShow = () => setShow(true);
  const handleShowTwo = () => setShowTwo(true);

  function carregarDados(servico) {
    setTitulo(servico.titulo);
    setDescricao(servico.descricao);
    setOrcamento(servico.orcamento);
    setDataLimite(servico.data_limite);
    handleShow();
  }
  function carregarModal(id) {
    // console.log(id);
    setId(id)
    handleShowTwo();
  }

  async function deletarServico(codigo) {
    const servico = {
      id: codigo,
    };
    const init = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth-token-access")
      },
      body: JSON.stringify(servico),
    };

    await fetch("http://localhost:8000/index/delete/" + codigo, init);
    window.location.reload(true);
  }
  async function atualizarStatus(id) {
    const servico = {
      situacao: status,
    };
    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth-token-access")
      },
      body: JSON.stringify(servico),
    };

    await fetch("http://localhost:8000/index/situacao/" + id, init);
    window.location.reload(true);
  }
  // console.log(status);
  return dados.map((servico) => (
    
    <div className={styles.cardCustom + " mb-3 mt-3"} key={servico.id}>
      <div className={styles.content}>
        <h1>{servico.titulo}</h1>
        <p>
          <strong>Descrição do serviço:</strong> {servico.descricao}
        </p>
        <p>
          <strong>Orçamento em R$: </strong> {servico.orcamento}
        </p>
        <p>
          <strong>Data limite: </strong>{" "}
          {servico.data_limite.split("-").reverse().join("/")}
        </p>
        <p>
          <strong>Data de cadastro: </strong>{" "}
          {servico.data_cadastro.split("-").reverse().join("/")}
        </p>
        <p>
          <strong>Comentários: </strong>{" "}
          {servico.cometarios}
        </p>
        <p>
          <label htmlFor="">Situação: </label>
          <select
            name="status"
            id=""
            className="form-control"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="DEFAULT">{servico.situacao}</option>
            <option value="Aberto">Aberto</option>
            <option value="Cancelado">Cancelado</option>
            <option value="Concluído">Concluído</option>
          </select>
        </p>
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-8 d-flex justify-content-between">
            <Button
              type="submit"
              className="btn btn-secondary"
              onClick={(e) => atualizarStatus(servico.id)}
            >
              Alterar Status
            </Button>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => {
                carregarDados(servico);
                setServico(servico);
              }}
            >
              Editar Serviço
            </Button>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => carregarModal(servico.id)}
            >
              Adicionar Comentário
            </Button>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={(e) => deletarServico(servico.id)}
            >
              Deletar
            </Button>
          </div>
        </div>
      </div>
    </div>
  ));
};
export default Servicos;
