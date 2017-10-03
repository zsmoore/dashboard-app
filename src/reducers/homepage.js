const homepage = (state = {}, action) => {
  switch (action.type) {
    case 'GET_RECIPES':
    console.log('action');
    console.log(state);
      return Object.assign(state, {
        recipes: action.payload.recipes
      });
    default:
      return state
    }
  }

export default homepage;