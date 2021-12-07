import Main from "../pages/Main";
import { Card } from "react-bootstrap";
import Input from '../itens/Input';
import { useState } from "react";

export default function Cadastro(){
  const [user, setUser] = useState();
  const [password, setPassword] = useState();
  const cadastrarUsuario = async (e) => {
    e.preventDefault();
    const usuario = {
      username: user,
      password: password,
    };
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(usuario),
    };
    
    await fetch("http://localhost:8000/usuario/", init)
      .then((response) => {
        // window.location.href = '/login';
      })

  };

  const content = (
    <div>
      <form action="" method="POST" onSubmit={(e) => cadastrarUsuario(e)}>
        <Card>
          <Card.Header>
            <h5>Cadastro de usuário</h5>
          </Card.Header>
          <Card.Body>
              <div className="col-md-6 mb-3">
                <Input
                  name="username"
                  id="username"
                  placeHolder="Usuário"
                  className="form-control"
                  type="text"
                  handleOnChange={(e) => setUser(e.target.value)}
                //   onChange={(e) => setUser(e.target.value)}
                />
              </div>
              <div className="col-md-6 mb-3">
                <Input
                  name="password"
                  id="password"
                  placeHolder="Senha"
                  className="form-control"
                  type="password"
                  handleOnChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="col-md-12 mb-3 text-center">
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              </div>
          </Card.Body>
        </Card>
      </form>
    </div>
  );
  return <Main content={content} />;
}
