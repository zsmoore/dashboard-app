import { GET_RECIPES, GET_USER, GET_SUGGESTIONS } from './';
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
  const url = 'https://api.whoshungry.io/session/create-user'
  const options = JSON.stringify({ method: 'POST', data: user }); 
  return dispatch => hitApi(url, options).then((payload) => {
    console.log(payload);
    dispatch({ type: GET_USER, payload: { user } });
  });
}

export function logout(username, password) {
  return { type: GET_USER, payload: { user: undefined } };
}

export function login(username, password) {  
  const user = { username, password, inventory: ['Steak', 'Chicken', 'Mozzarella'] };
  return { type: GET_USER, payload: { user } };
}

export function findRecipes(selected) {
  let url;
  if (selected.length > 0) {
    const ingredientString = selected.map(food => `ingredient=${food.id}`).join('&');
    url = `https://api.whoshungry.io/food/search?${ingredientString}`;
  } else url = 'https://api.whoshungry.io/food/search';
  const options = JSON.stringify({ method: 'GET' }); 
  return dispatch => hitApi(url, options).then((payload) => {
    dispatch({ type: GET_RECIPES, payload });
  });
}