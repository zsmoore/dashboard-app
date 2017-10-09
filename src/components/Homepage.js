import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import RecipeView from './RecipeView';
import Navbar from './NavBar';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import { findRecipes, login, logout, signup, update, getSuggestions } from '../actions/homepage';

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };
    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
    this._signup = this._signup.bind(this);
    this._add = this._add.bind(this);
    this._getSuggestions = this._getSuggestions.bind(this);
    this._remove = this._remove.bind(this);
    this._select = this._select.bind(this);
  }

  _login(username, password) {
    this.setState({ selected: [] });
    let { data: { user } } = this.props;
    if (!user) user = { inventory: [] };
    user = Object.assign(user, { username, password });
    this.props.login(user);
    this.props.findRecipes([]);
  }

  _logout(username, password) {
    this.setState({ selected: [], loggedIn: false });
    this.props.logout();
  }

  _signup(email, password) {
    const username = email.substring(0, email.indexOf('@'));
    let { data: { user } } = this.props;
    if (!user) user = { inventory: [] };
    user = Object.assign(user, { username, password, email })
    this.props.signup(user);
    this.props.findRecipes([]);
  }

  _login(username, password) {
    this.setState({ selected: [], inventory: [] });
    this.props.login(username, password);
  }

  _logout(username, password) {
    this.setState({ selected: [] });
    this.props.logout();
  }

  _signup(username, password) {
    const { inventory } = this.state;
    this.props.signup({ username, password, inventory });
  }

  _add(suggestion, selected) {
    if (!selected) return;
    let { data: { user, suggestions } } = this.props;
    if (!user) user = { inventory: [] };
    const { inventory } = user;
    inventory.unshift(suggestions.find(food => food.name === suggestion));
    this.props.update(user, inventory);
    this.props.getSuggestions(inventory, '');
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
    const { data: { user } } = this.props;
    const inventory = user ? user.inventory : [];
    inventory.splice(index, 1);
    this.props.update(user, inventory);
  }

  _getSuggestions(event) {
    const { user } = this.props.data;
    const inventory = user ? user.inventory : [];
    this.props.getSuggestions(inventory, event.target.value);
  }

  render() {
    const { selected } = this.state;
    let { recipes, user, search, suggestions, loggedIn} = this.props.data;
    const inventory = user ? user.inventory : [];
    if (!recipes) recipes = [];
    if(loggedIn === undefined) loggedIn = false;
    return (
      <Article style={{height: '100vh', overflow: 'hidden'}}>
        <Navbar loggedIn={loggedIn} user={user} login={this._login} logout={this._logout} signup={this._signup}/>
        <Box flex={true} direction='row' responsive={false}>
          <Sidebar
            search={search || ''} suggestions={suggestions || []} getSuggestions={this._getSuggestions}
            inventory={inventory} selected={selected} select={this._select} 
            add={this._add} findRecipes={this.props.findRecipes} remove={this._remove}
          />
          <RecipeView recipes={recipes} />
        </Box>
      </Article>
    );
  }
}

Homepage.propTypes = {
  data: PropTypes.shape({
    recipes: PropTypes.array,
    user: PropTypes.shape({
      username: PropTypes.string,
      inventory: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string
        })
      ),
      suggestions: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      }),
      search: PropTypes.array
    })
  }),  
  findRecipes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ data: state });

const mapDispatchToProps = dispatch => ({
  findRecipes: selected => dispatch(findRecipes(selected)),
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout()),
  signup: (username, password, inventory) => dispatch(signup(username, password, inventory)),
  update: inventory => dispatch(update(inventory)),
  getSuggestions: (inventory, search, suggest) => dispatch(getSuggestions(inventory, search, suggest))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
