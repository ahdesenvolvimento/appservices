import { useState } from "react";
import Input from "../itens/Input";
import Main from "./Main";
import styles from './Login.module.css';
export default function Login() {
  const [user, setUser] = useState();
  const [password, setPassword] = useState();

  const loginUser = async (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: user, password: password }),
    };
    await fetch("http://localhost:8000/api/token/", init)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          console.log(response);
          throw new Error("Usuário ou senha inválidos, tente novamente");
        }
      })
      .then((token) => {
        const token_list = JSON.parse(token);
        localStorage.setItem("auth-token-access", token_list["access"]);
        localStorage.setItem("auth-token-refresh", token_list["refresh"]);
        window.location.href = '/';
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const content = (
    <div className={styles.login}>
      <form action="" method="POST" onSubmit={(e) => loginUser(e)}>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Usuário"
          handleOnChange={(e) => setUser(e.target.value)}
          className="form-control"
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Senha"
          handleOnChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        <button type="submit" className="btn btn-primary my-3" id="buttonLogin">
          Entrar
        </button>
      </form>
    </div>
  );

  return <Main content={content} />;
}
