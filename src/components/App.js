import React, { Component } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import RecipeView from './RecipeView';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div>
            <Sidebar />
            <RecipeView />
        </div>
      </div>
    );
  }
}

export default App;
