import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './Components/Navbar/Navbar';
import Herosection from './Components/Homepage/Herosection';
import Currencydata from './Components/Homepage/Currencydata';
import Footer from './Components/Footer/Footer';
import News from './Components/News/News'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Herosection />
                <Currencydata />
              </>
            }
          />
          <Route path="/news" element={<News />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
