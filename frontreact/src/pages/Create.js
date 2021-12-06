import { useEffect, useState } from "react";
import Input from "../itens/Input";
import { Button } from "react-bootstrap";
import Main from "./Main";
import { Redirect } from "react-router";
function Create() {
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();
  const [orcamento, setOrcamento] = useState();
  const [data_limite, setDataLimite] = useState();

  const cadastrarServico = async (e) => {
    e.preventDefault();
    const servico = {
      titulo: titulo,
      descricao: descricao,
      orcamento: orcamento,
      data_limite: data_limite,
      situacao: "Aberto",
    };
    console.log(servico);
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('auth-token-access')
      },
      body: JSON.stringify(servico),
    };

    await fetch("http://localhost:8000/", init);
    window.location.reload(true);
  };

  useEffect(() => {
    if (!localStorage.getItem('auth-token-access')){
      <Redirect to="/login"/>
      // window.location.href='/login';
    }
  })

  const content = (
    <div className="card mt-4">
      <div className="card-body">
        <form action="" method="POST">
          <div className="col-md-12 mb-3">
            <Input
              type="text"
              text="Título"
              name="titulo"
              placeholder="Título do serviço"
              className="form-control"
              handleOnChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="col-md-12 mb-3">
            <Input
              type="text"
              text="Descriçao"
              name="descricao"
              placeholder="Descrição do serviço"
              className="form-control"
              handleOnChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className="col-md-12 mb-3">
            <Input
              type="text"
              text="Orçamento"
              name="orcamento"
              placeholder="Orçamento do serviço"
              className="form-control"
              handleOnChange={(e) => setOrcamento(e.target.value)}
            />
          </div>
          <div className="col-md-12 mb-3">
            <Input
              type="date"
              text="Data limite"
              name="data_limite"
              placeholder="Data limite do serviço"
              className="form-control"
              handleOnChange={(e) => setDataLimite(e.target.value)}
            />
          </div>
          {/* <div className="col-md-12 mb-3">
                <Select
                  text="Situação"
                  name="situacao"
                  className="form-control"
                  handleOnChange={(e) => setSituacao(e.target.value)}
                  id="situacao"
                />
              </div> */}
          <div className="col-md-12 mb-3">
            <Button
              type="button"
              onClick={cadastrarServico}
              className="btn btn-primary w-100"
            >
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
  return (
    <Main content={content}/>
  );
}

export default Create;
