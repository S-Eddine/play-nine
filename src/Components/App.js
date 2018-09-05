import React, { Component } from 'react';
import './../Styles/App.css';
import Game from './Game/index.js'
import configureStore from './Redux/Store/configureStore';
import { Provider } from 'react-redux';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Game />
        </div>
      </Provider>
    );
  }
}

export default App;
