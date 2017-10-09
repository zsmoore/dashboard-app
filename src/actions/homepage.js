import { GET_RECIPES, GET_USER, GET_SUGGESTIONS, LOGIN, LOGOUT } from './';
import { hitApi } from '../api'; 

export function getSuggestions(inventory, search) {
  if(search.length > 3){
    const url = `https://api.whoshungry.io/food/autocomplete?partial=${search}`;
    const options = JSON.stringify({ method: 'GET' }); 
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
  return({ type: 'LOGIN', payload: { user } });
  /*const url = 'https://api.whoshungry.io/session/create-user'
  const options = JSON.stringify({ method: 'POST', body: user }); 
  return dispatch => hitApi(url, options).then((payload) => {
    console.log(payload);
    payload.inventory = user.inventory;
    dispatch({ type: GET_USER, payload });
  });*/
}

export function logout() {
  return { type: 'LOGOUT', payload: { user: undefined } };
}

export function login(user) {
  console.log('user', user);
  return({ type: 'LOGIN', payload: { user } });
  /*const url = 'https://api.whoshungry.io/api-token-auth/'
  const options = JSON.stringify({ method: 'POST', body: { username, password } }); 
  return dispatch => hitApi(url, options).then((payload) => {
    console.log(payload);
    payload.inventory = [];
    dispatch({ type: GET_USER, payload });
  });*/
}

export function findRecipes(selected) {
  let url;
  if (selected.length > 0) {
    const ingredientString = selected.map(food => `ingredient=${food.id}`).join('&');
    url = `https://api.whoshungry.io/food/search?${ingredientString}`;
  } else url = 'https://api.whoshungry.io/food/search';
  const options = JSON.stringify({ method: 'GET' }); 
  return dispatch => hitApi(url, options).then((payload) => {
    if (payload.recipes.length > 20) payload.recipes = payload.recipes.slice(0, 20);
    dispatch({ type: GET_RECIPES, payload });
  });
}