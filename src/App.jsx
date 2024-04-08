import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Home } from './pages/home';
import { Auth } from './pages/auth';
import { Movie } from './pages/movie';
import './App.css';
import { Rated } from './pages/rated';
import Footer from './components/footer';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/rated' element={<Rated />} />
          <Route path='/movie/:id' element={<Movie />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
