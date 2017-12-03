import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import Calculator from './calculator.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Kalkulator pensji</h1>

        <div id="main">
          <Calculator />
        </div>
      </div>
    );
  }
}

export default App;
