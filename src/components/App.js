import React, { Component } from 'react';
import '../App.css';
import '../../node_modules/grommet-css'
import GrommetApp from 'grommet/components/App';
import Homepage from './Homepage';

/**
 * The main app component. Adds the store into the app and renders the app.
 */
class App extends Component {
  
  render() {
    return (
      <GrommetApp centered={false} style={{height: window.innerHeight}}>
        <Homepage />
      </GrommetApp>
    );
  }
}

export default App;
