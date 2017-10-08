import { GET_RECIPES, GET_USER, GET_SUGGESTIONS, UPDATE_SEARCH } from '../actions'

const homepage = (state = {}, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return Object.assign({}, { ...state,
        recipes: action.payload.recipes
      }); 
    case GET_USER:
      return Object.assign({}, { ...state,
        user: action.payload.user
      });
    case GET_SUGGESTIONS:
      return Object.assign({}, { ...state,
        suggestions: action.payload.suggestions,
        search: action.payload.search
      });
    default:
      return state
    }
  }

export default homepage;