import styles from "./Header.module.css";
import { Link, Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Create from "../../pages/Create";
import Home from "../../pages/Home";
function Header() {
  return (
    <Router>
      <div className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.brand}>
            <li>
              <h1>APPServices</h1>
            </li>
          </ul>
          <ul className={styles.navLinks}>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <Link to="/create">Criar Serviço</Link>
            </li>
          </ul>
          <ul className={styles.toggler}>
            <li>1312</li>
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
      </Switch>
    </Router>
  );
}

export default Header;
