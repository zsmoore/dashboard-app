import React, { Component } from 'react';
import logo from './logo.svg';
import NavBar from './Navbar';
import Sidebar from './Sidebar';
import RecipeView from './RecipeView';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div>
            <Sidebar />
            <RecipeView />
        </div>
      </div>
    );
  }
}

export default App;
