import React, { Component } from 'react';

import '../App.css';
import '../../node_modules/grommet-css'

import Navbar from './NavBar';
import Sidebar from './Sidebar';
import RecipeView from './RecipeView';

import GrommetApp from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Headline from 'grommet/components/Headline';
import Header from 'grommet/components/Header';
import Image from 'grommet/components/Image';
import Section from 'grommet/components/Section';

import logo from '../logo.svg';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      library: ['ing 1', 'search 2', '3rd ingredient'],
      inventory: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
      selected: []
    }
    this._add = this._add.bind(this);
    this._findRecipes = this._findRecipes.bind(this);
    this._select = this._select.bind(this);
    this._remove = this._remove.bind(this);
  }

  _add(suggestion, selected) {
    if(selected) {
      const { library, inventory} = this.state;
      const i = library.indexOf(suggestion);
      if (i >= 0) {
        library.splice(i,1);
        inventory.unshift(suggestion);
      } 
      this.setState({ library, inventory });
    }
  }

  _findRecipes() {
    console.log('find recipes and show in main content.. need to inherit this')
  }

  _select(ingredient) {
    const { selected } = this.state;
    const index = selected.indexOf(ingredient);
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(ingredient);
    }
    this.setState({ selected });    
  }

  _remove(index) {
    const { inventory, selected } = this.state;
    if (index < 0) {
      selected.forEach(ingredient => {
        const i = inventory.indexOf(ingredient);
        if (i >= 0) inventory.splice(i, 1);
      });
      this.setState({ inventory, selected: [] });
    }
    else {
      inventory.splice(index, 1);
      this.setState({ inventory });
    }
  }

  render() {
    const { inventory, library, selected } = this.state;
    console.log(this.state);
    return (
      <GrommetApp centered={false}>
        <Navbar />
        {/*<Header>
          <Image size='small' src={logo} />
          <Headline>Welcome to React with Grommet</Headline>
        </Header>*/}
        <Article direction='row'>
          <Sidebar 
            inventory={inventory} library={library} selected={selected} select={this._select} 
            add={this._add} findRecipes={this._findRecipes} remove={this._remove}
          />
          <Section style={{ width: '80%' }}><RecipeView /></Section>
        </Article>
      </GrommetApp>
    );
  }
}

export default App;
