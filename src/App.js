import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
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
                <div id="market-section">
                  <Currencydata />
                </div>
              </>
            }
          />
          <Route path="/news" element={<News />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
