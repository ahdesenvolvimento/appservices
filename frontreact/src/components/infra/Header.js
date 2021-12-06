import styles from "./Header.module.css";
import { Link, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Create from "../../pages/Create";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Cadastro from "../../pages/Cadastro";
function Header() {
  const [show, setShow] = useState(false);
  const handleToggle = () => {
    let links = document.getElementById("navLinks");
    return show === true
      ? (setShow(false), (links.style.display = "none"))
      : (setShow(true),
        (links.style.display = "flex"),
        (links.style.flexDirection = "column"));
  };

  const logout = async (e) => {
    e.preventDefault();
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth-token-access"),
      },
      body: JSON.stringify({
        refresh: localStorage.getItem("auth-token-refresh"),
      }),
    };
    fetch("http://localhost:8000/logout/", init).then((token) => {
      localStorage.removeItem("auth-token-access");
      localStorage.removeItem("auth-token-refresh");
      window.location.href = "/login/";
    });
  };
  return (
    <Router>
      <div className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.brand}>
            <li>
              <h1>APPServices</h1>
            </li>
          </ul>
          <ul className={styles.navLinks} id="navLinks">
            <li>
              <Link to="/cadastro">Cadastro</Link>
            </li>
            {localStorage.getItem("auth-token-access") &&
            localStorage.getItem("auth-token-access").length > 0 ? (
              <>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <Link to="/create">Criar Serviço</Link>
                </li>
                <li>
                  <Link to="/login" onClick={(e) => logout(e)}>
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
          <ul className={styles.toggler}>
            <li>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleToggle}
              >
                <span>
                  <FontAwesomeIcon icon={faBars} />
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
        <Route path="/cadastro">
          <Cadastro />
        </Route>
        {localStorage.getItem("auth-token-access") &&
        localStorage.getItem("auth-token-access").length > 0 ? (
          <>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </>
        ) : (
          <>
            <Route path="*">
              <Login />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default Header;
