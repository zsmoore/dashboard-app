import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import RecipeView from './RecipeView';
import Navbar from './NavBar';
import Article from 'grommet/components/Article';
import Box from 'grommet/components/Box';
import { findRecipes, login, logout, signup, update, getSuggestions, setPopup } from '../actions/homepage';

/**
 * Component to render the entire homepage, including the navbar, sidebar, and recipe view.
 * @prop data - All of the data returned from redux actions.  See Homepage.PropTypes for specific structure.
 */
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

  /**
   * function passed into navbar for login
   * @param {string} username - username to login in with
   * @param {string} password - password to login in with
   */  
  _login(username, password) {
    this.setState({ selected: [] });
    let { data: { user } } = this.props;
    this.props.login({ username, password });
  }

  /**
   * function passed into navbar for logging out
   */
  _logout() {
    this.setState({ selected: [], loggedIn: false });
    this.props.logout();
  }

  /**
   * function passed into navbar for creating a new account
   * @param {string} email - email to sign up with
   * @param {string} password - password to sign up with
   */
  _signup(email, password) {
    const username = email.substring(0, email.indexOf('@'));
    let { data: { user } } = this.props;
    if (!user) user = { inventory: [] };
    user = Object.assign(user, { username, password, email })
    this.props.signup(user);
  }

  /**
   * function passed to sidebar for adding searched ingredient to inventory
   * @param {string} suggestion - selected suggestion
   * @param {bool} selected - True if an option was selected, 
   *   false if enter was pressed without an option being selected 
   */
  _add(suggestion, selected) {
    if (!selected) return;
    let { data: { user, suggestions } } = this.props;
    if (!user) user = { inventory: [] };
    const { inventory } = user;
    inventory.unshift(suggestions.find(food => food.name === suggestion));
    this.props.update(user, inventory);
    this.props.getSuggestions(inventory, '');
  }

  /**
   * function passed to sidebar to select an ingredient in your inventory
   * @param {object} ingredient - ingredient object to select
   */
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

  /**
   * function to remove an inventory item
   * @param {int} index - index of item to be removed
   */
  _remove(index) {
    const { data: { user } } = this.props;
    const inventory = user ? user.inventory : [];
    inventory.splice(index, 1);
    this.props.update(user, inventory);
  }

  /**
   * function passed in to sidebar to adjust suggestions as the search term changes
   * @param {object} event - event object passed in on keystroke
   */
  _getSuggestions(event) {
    const { user } = this.props.data;
    const inventory = user ? user.inventory : [];
    this.props.getSuggestions(inventory, event.target.value);
  }

  /**
	 * re renders the page when props or state are updated
	 */
  render() {
    console.log(this.props);
    const { selected } = this.state;
    let { recipes, user, search, suggestions, loggedIn, message, currentPopup} = this.props.data;
    const inventory = user ? user.inventory : [];
    if (!recipes) recipes = [];
    if (loggedIn === undefined) loggedIn = false;
    if (message === undefined) message = '';
    if (currentPopup === undefined) currentPopup = '';
    return (
      <Article style={{height: '100vh', overflow: 'hidden'}}>
        <Navbar message={message} loggedIn={loggedIn} user={user} 
          login={this._login} logout={this._logout} signup={this._signup} currentPopup={currentPopup}
          setPopup={this.props.setPopup}
        />
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

/**
 * The props of the homepage
 */
Homepage.propTypes = {
  data: PropTypes.shape({
    currentPopup: PropTypes.string,
    message: PropTypes.string,
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
  })
}
/**
 * Part of React-redux, used to update the props when an action is called.
 * @param {object} state 
 */
const mapStateToProps = state => ({ data: state });

/**
 * Part of React-redux, used to map functions to dispatch to call actions
 * @param {func} dispatch 
 */
const mapDispatchToProps = dispatch => ({
  findRecipes: selected => dispatch(findRecipes(selected)),
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout()),
  signup: (username, password, inventory) => dispatch(signup(username, password, inventory)),
  update: inventory => dispatch(update(inventory)),
  getSuggestions: (inventory, search, suggest) => dispatch(getSuggestions(inventory, search, suggest)),
  setPopup: popup => dispatch(setPopup(popup))
});

// impliments the component with the previous two functions
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
