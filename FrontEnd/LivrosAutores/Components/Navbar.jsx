import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/livros" className={styles.link}>Livros</Link>
        </li>
        <li>
          <Link to="/autores" className={styles.link}>Autores</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
