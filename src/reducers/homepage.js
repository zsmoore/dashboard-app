import { GET_RECIPES } from '../actions'

const homepage = (state = {}, action) => {
  switch (action.type) {
    case GET_RECIPES:
    console.log('action', action.payload.recipes);
      return Object.assign({}, { ...state,
        recipes: action.payload.recipes
      });
    default:
      return state
    }
  }

export default homepage;