import './App.module.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Navbar from '../Components/Navbar';
import Livros from '../Components/Livros';
import Autores from '../Components/Autores';

function App() {

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/livros" element={<Livros />} />
          <Route path="/autores" element={<Autores />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
