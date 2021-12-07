import styles from "./Footer.module.css";

function Footer() {
  return (
    <div className={styles.espaco}>
      <div className={styles.footer}>
        <p>
          Você pode acessar o código do projeto através do{" "}
          <a
            href="https://github.com/ahdesenvolvimento/appservices"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
