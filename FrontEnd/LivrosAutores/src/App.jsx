import styles from './App.module.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from '../Components/Navbar';
import Livros from '../Components/Livros';
import Autores from '../Components/Autores';

function App() {

  return (
    <Router>
      <main className={styles.main}>
        <Navbar />
        <Routes>
          <Route path="/livros" element={<Livros />} />
          <Route path="/autores" element={<Autores />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App
