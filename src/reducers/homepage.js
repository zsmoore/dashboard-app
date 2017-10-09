import { GET_RECIPES, GET_USER, GET_SUGGESTIONS, LOGIN, LOGOUT, ERROR, SET_POPUP } from '../actions'

const homepage = (state = {}, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return Object.assign({}, { ...state,
        recipes: action.payload.recipes
      }); 
    case LOGIN:
      return Object.assign({}, { ...state,
        user: action.payload.user,
        loggedIn: true,
        message: '',
        currentPopup: ''
      });
    case LOGOUT:
      return Object.assign({}, { ...state,
        user: action.payload.user,
        loggedIn: false,
        search: '',
        recipes: []
      });
    case GET_USER:
      if(!action.payload.user) return state;
      return Object.assign({}, { ...state,
        user: action.payload.user
      });
    case GET_SUGGESTIONS:
      return Object.assign({}, { ...state,
        suggestions: action.payload.suggestions,
        search: action.payload.search
      });
    case ERROR:
      return Object.assign({}, { ...state,
        message: action.payload.message
      });
    case SET_POPUP:
      return Object.assign({}, { ...state,
        currentPopup: action.payload.currentPopup,
        message: action.payload.message
      });
    default:
      return state
    }
  }

export default homepage;