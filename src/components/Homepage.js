import React, { Component } from 'react';

import Sidebar from './Sidebar';
import RecipeView from './RecipeView';

import Split from 'grommet/components/Split';

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      library: ['ing 1', 'search 2', '3rd ingredient'],
      inventory: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
      selected: [],
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
    const { inventory, library, selected} = this.state;
    return (
      <Split direction='column' priority='right' fixed={true} flex='right'>
        <Sidebar 
          inventory={inventory} library={library} selected={selected} select={this._select} 
          add={this._add} findRecipes={this._findRecipes} remove={this._remove}
        />
        <RecipeView />
      </Split>
    );
  }
}

export default Homepage;
