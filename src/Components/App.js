import React, { Component } from 'react';
import './../Styles/App.css';
import Game from './Game/index.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;
