import { GET_RECIPES, GET_USER, GET_SUGGESTIONS, LOGIN, LOGOUT, ERROR, SET_POPUP } from './';
import { hitApi } from '../api';

export function getSuggestions(inventory, search) {
  if(search.length > 3){
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

export function update(u, inventory) {
  const user = Object.assign({}, u || {}, inventory);
  return { type: GET_USER, payload: { user } };
} 

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

export function setPopup(currentPopup) {
  console.log('curr', currentPopup);
  return { type: SET_POPUP, payload: { currentPopup } };
}

export function clearError() {
  return { type: ERROR, payload: { message: '' } };
}

export function logout() {
  return { type: LOGOUT, payload: { user: undefined } };
}

export function login(user) {
  const url = 'https://api.whoshungry.io/api-token-auth/'
  console.log('user', user);
  const headers = {};
  headers['content-type'] = 'application/json';
  const options = { method: 'POST', headers, body: JSON.stringify(user) };
  return dispatch => hitApi(url, options).then((payload) => {
    console.log('payload',payload);
    if (payload.non_field_errors) {
      dispatch({ type: ERROR, payload: { message: payload.non_field_errors[0] } });
      return;
    }
    user = Object.assign(user, payload, { inventory: [] });
    dispatch({ type: LOGIN, payload: { user } });
    dispatch(findRecipes([]));
  });
}

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