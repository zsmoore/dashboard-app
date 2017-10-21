import { GET_RECIPES, GET_USER, GET_SUGGESTIONS, LOGIN, LOGOUT, ERROR, SET_POPUP } from './';
import { hitApi } from '../api';

//All redux actions are defined here

/**
 * Checks if the search string is at least 3 characters long. 
 * If so, hits the back end to get valid inventory items beginning with the search string 
 * and filters out items already in the inventory.
 * @param {list} inventory - the current inventory
 * @param {string} search  - the search string
 */
export function getSuggestions(inventory, search) {
  if(search.length > 2) {
    const url = `https://api.whoshungry.io/food/autocomplete?partial=${search}`;
    const options = { method: 'GET' }; 
    return dispatch => hitApi(url, options).then((payload) => {
      payload.search = search;
      payload.suggestions = payload.items.filter(food => {
        return search.toLowerCase() === food.name.substring(0, search.length).toLowerCase()
          && inventory.findIndex(f => f.name === food.name) < 0;
      });
      dispatch({ type: GET_SUGGESTIONS, payload  });
    });
  }
  return { type: GET_SUGGESTIONS, payload: { suggestions: [], search } };
}

/**
 * updates the user's inventory
 * @param {object} u - the current user object 
 * @param {list} inventory - the current inventory 
 */
export function update(u, inventory, food) {
  //do the inventory stuff here
  const user = Object.assign({}, u || {}, inventory);
  return { type: GET_USER, payload: { user } };
} 

/**
 * Passes in a user to create an account for and sends it to the backend, and updates any error messages
 * @param {object} user - the user object to sign up 
 */
export function signup(user) {
  const url = 'https://api.whoshungry.io/session/create-user'
  const options = { method: 'POST', body: JSON.stringify(user) };
  return dispatch => hitApi(url, options).then((payload) => {
    if (payload.response === 'error') {
      dispatch({ type: ERROR, payload});
      return;
    }
    dispatch(login({ username: user.username, password: user.password }));
  });
}

/**
 * sets the current popup layer to display
 * @param {string} currentPopup - string representing the current popup to display
 */
export function setPopup(currentPopup) {
  return { type: SET_POPUP, payload: { currentPopup } };
}

/**
 * logs the current user out
 */
export function logout() {
  return { type: LOGOUT, payload: { user: undefined } };
}

/**
 * Takes in a user object and asks the backend for user auhentication
 * @param {object} user - user object to authenticate
 */
export function login(user) {
  const url = 'https://api.whoshungry.io/api-token-auth/'
  const headers = {};
  headers['content-type'] = 'application/json';
  const options = { method: 'POST', headers, body: JSON.stringify(user) };
  return dispatch => hitApi(url, options).then((payload) => {
    if (payload.non_field_errors) {
      dispatch({ type: ERROR, payload: { message: payload.non_field_errors[0] } });
      return;
    }
    // do the inventory stuff here
    user = Object.assign(user, payload, { inventory: [] });
    dispatch({ type: LOGIN, payload: { user } });
    dispatch(findRecipes([]));
  });
}

/**
 * Takes the selected ingredients and hits the back end to get recipes involving those ingredients
 * @param {list} selected - list of selected ingredient objects
 */
export function findRecipes(selected) {
  let url;
  if (selected.length > 0) {
    const ingredientString = selected.map(food => `ingredient=${food.id}`).join('&');
    url = `https://api.whoshungry.io/food/search?${ingredientString}`;
  } else url = 'https://api.whoshungry.io/food/search';
  const options = { method: 'GET' }; 
  return dispatch => hitApi(url, options).then((payload) => {
    if (payload.recipes.length > 20) payload.recipes = payload.recipes.slice(0, 20);
    dispatch({ type: GET_RECIPES, payload });
  });
}