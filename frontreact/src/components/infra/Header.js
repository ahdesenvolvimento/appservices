import styles from "./Header.module.css";
import { Link, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Create from "../../pages/Create";
import Home from "../../pages/Home";
import Login from "../../pages/Login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function Header() {
  const [show, setShow] = useState(false);
  const handleToggle = () => {
    let links = document.getElementById("navLinks");
    let li = document.querySelectorAll("#navLinks li");
    return show === true
      ? (setShow(false),
        (links.style.display = "none"))
      : (setShow(true),
        (links.style.display = "flex"),
        (links.style.flexDirection = "column"));
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
              <a href="/">Home</a>
            </li>
            <li>
              <Link to="/create">Criar Serviço</Link>
            </li>
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
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default Header;
