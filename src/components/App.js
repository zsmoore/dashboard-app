import React, { Component } from 'react';
import Navbar from './NavBar';
import Sidebar from './Sidebar';
import RecipeView from './RecipeView';
import './bootstrap-navbar-menu/layout-2/assets/bootstrap/css/bootstrap.min.css';
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
