import { GET_RECIPES, GET_USER } from '../actions'

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
    default:
      return state
    }
  }

export default homepage;