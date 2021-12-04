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
  function carregarModal(e) {
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
      },
      body: JSON.stringify(servico),
    };

    await fetch("http://localhost:8000/index/delete/" + codigo, init);
    // const dados = await response.json()
    // window.location = newLocation;
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
      },
      body: JSON.stringify(servico),
    };

    await fetch("http://localhost:8000/index/situacao/" + id, init);
    // const dados = await response.json()
    // window.location = newLocation;
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
    // <div className="mb-3 mt-3">
    //   <div className={"container "+styles.card} key={servico.id}>
    //     <h1 className={styles.titulo}>{servico.titulo}</h1>
    //     <p>{servico.descricao}</p>
    //     <p>R$ {servico.orcamento}</p>
    //     <p>Data limite: {servico.data_limite}</p>
    //     <p>Data de cadastro: {servico.data_cadastro}</p>
    //     <p>
    //       Situação:{" "}
    //       <select
    //         name="status"
    //         id=""
    //         className="form-control"
    //         onChange={(e) => setStatus(e.target.value)}
    //       >
    //         <option value="DEFAULT">{servico.situacao}</option>
    //         <option value="Aberto">Aberto</option>
    //         <option value="Cancelado">Cancelado</option>
    //         <option value="Concluído">Concluído</option>
    //       </select>
    //     </p>
    //     <p>Comentários: {servico.cometarios}</p>
    //     <div className="container pb-4 pt-4">
    //       <Button
    //         type="submit"
    //         className="btn btn-primary margin"
    //         onClick={(e) => atualizarStatus(servico.id)}
    //       >
    //         Alterar Status
    //       </Button>
    //       <Button
    //         type="button"
    //         className="btn btn-primary margin"
    //         onClick={(e) => {
    //           carregarDados(servico);
    //           setServico(servico);
    //         }}
    //       >
    //         Editar Serviço
    //       </Button>
    //       <Button
    //         type="button"
    //         className="btn btn-primary margin"
    //         onClick={(e) => carregarModal(servico.id)}
    //       >
    //         Adicionar Comentário
    //       </Button>
    //       <Button
    //         type="button"
    //         className="btn btn-primary margin"
    //         onClick={(e) => deletarServico(servico.id)}
    //       >
    //         Deletar
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  ));
};
export default Servicos;
