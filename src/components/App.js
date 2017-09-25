import React, { Component } from 'react';

import '../App.css';
import '../../node_modules/grommet-css'
import GrommetApp from 'grommet/components/App';
import Homepage from './Homepage';

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
