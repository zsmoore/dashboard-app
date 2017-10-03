import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import RecipeView from './RecipeView';
import Navbar from './NavBar';

import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';

import { findRecipes } from '../actions/homepage';

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      library: ['Broccoli', 'Parmesan', 'Fettuccine', 'Steak', 'Chicken', 'Mozzarella'],
      inventory: ['Steak', 'Chicken', 'Mozzarella'],
      selected: [],
    };
    this._add = this._add.bind(this);
    this._select = this._select.bind(this);
    this._remove = this._remove.bind(this);
  }

  componentWillMount() {
    this.props.findRecipes([]);
  }

  _add(suggestion, selected) {
    if (selected) {
      const { library, inventory} = this.state;
      const i = library.indexOf(suggestion);
      if (i >= 0) {
        inventory.unshift(suggestion);
      } 
      this.setState({ library, inventory });
    }
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
    const { findRecipes, data: { recipes } } = this.props;
    console.log(this.props);
    return (
      <Article style={{height: '100vh', overflow: 'hidden'}}>
        <Navbar />
        <Box flex={true} direction='row' responsive={false}>
          <Sidebar 
            inventory={inventory} library={library} selected={selected} select={this._select} 
            add={this._add} findRecipes={findRecipes} remove={this._remove}
          />
          <RecipeView recipes={recipes} />
        </Box>
      </Article>
    );
  }
}

Homepage.propTypes = {
  recipes: PropTypes.array,
  findRecipes: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    data: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    findRecipes: selected => dispatch(findRecipes(selected))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
