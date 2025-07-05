import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Herosection from './Components/Homepage/Herosection';
import Appinfo from './Components/Homepage/Appinfo';
import Currencydata from './Components/Homepage/Currencydata';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Herosection />
      <Appinfo />
      <Currencydata />
    </div>
  );
}

export default App;
