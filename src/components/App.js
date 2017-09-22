import React, { Component } from 'react';

import '../App.css';
import '../../node_modules/grommet-css'

import Navbar from './NavBar';
import Sidebar from './Sidebar';
import RecipeView from './RecipeView';
import Homepage from './Homepage';

import GrommetApp from 'grommet/components/App';

class App extends Component {
  
  render() {
    return (
      <GrommetApp centered={false}>
        <Navbar />
        <Homepage />
      </GrommetApp>
    );
  }
}

export default App;
