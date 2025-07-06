import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Herosection from './Components/Homepage/Herosection';
import Appinfo from './Components/Homepage/Appinfo';
import Currencydata from './Components/Homepage/Currencydata';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Herosection />
      <Appinfo />
      <Currencydata />
      <Footer />
    </div>
  );
}

export default App;
