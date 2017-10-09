import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import RecipeView from './RecipeView';
import Navbar from './NavBar';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import { findRecipes, login, logout, signup, update } from '../actions/homepage';

class Homepage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      library: ['Broccoli', 'Parmesan', 'Fettuccine', 'Steak', 'Chicken', 'Mozzarella'],
      inventory: [],
      selected: [], 
      search: ''
    };
    this._login = this._login.bind(this);
    this._logout = this._logout.bind(this);
    this._signup = this._signup.bind(this);
    this._add = this._add.bind(this);
    this._getSuggestions = this._getSuggestions.bind(this);
    this._remove = this._remove.bind(this);
    this._select = this._select.bind(this);
  }

  componentWillMount() {
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
    const { search } = this.state;
    const { user } = this.props.data
    const inventory = user ? user.inventory : this.state.inventory;
    if (!selected && (search.length === 0 ||
      inventory.filter(food => food.toLowerCase() === search.toLowerCase()).length > 0
    )) return;
    const val = selected ? suggestion :
      `${search.charAt(0).toUpperCase()}${search.substring(1).toLowerCase()}`;
    inventory.unshift(val);
    if (user) this.props.update(user, inventory);
    else this.setState({ search: '', suggestions: [], inventory });
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
    const inventory = user ? user.inventory : this.state.inventory;
    inventory.splice(index, 1);
    if (user) this.props.update(user, inventory);
    else this.setState({ inventory });
  }

  _getSuggestions(event) {
    const search = event.target.value;
    let suggestions = [];
    /*if (search.length > 3) {
      const { library, inventory } = this.state;
      // this.props.getSuggestions(inventory, search);
      suggestions = library.filter(food => {
        return search.toLowerCase() === food.substring(0, search.length).toLowerCase()
          && inventory.indexOf(food) < 0;
      });
    }*/
    this.setState({ search, suggestions });
  }

  render() {
    const { library, selected, suggestions, search } = this.state;
    let { recipes, user } = this.props.data;
    const inventory = user ? user.inventory : this.state.inventory;
    if (!recipes) recipes = [];
    console.log(inventory, user);
    return (
      <Article style={{height: '100vh', overflow: 'hidden'}}>
        <Navbar user={user} login={this._login} logout={this._logout} signup={this._signup}/>
        <Box flex={true} direction='row' responsive={false}>
          <Sidebar
            search={search} suggestions={suggestions} getSuggestions={this._getSuggestions}
            inventory={inventory} library={library} selected={selected} select={this._select} 
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
      inventory: PropTypes.arrayOf(PropTypes.string)
    })
  }),  
  findRecipes: PropTypes.func.isRequired
}

const mapStateToProps = state => ({ data: state });

const mapDispatchToProps = dispatch => ({
  findRecipes: selected => dispatch(findRecipes(selected)),
  login: (username, password) => dispatch(login(username,password)),
  logout: () => dispatch(logout()),
  signup: (username, password, inventory) => dispatch(signup(username, password, inventory)),
  update: inventory => dispatch(update(inventory))
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
