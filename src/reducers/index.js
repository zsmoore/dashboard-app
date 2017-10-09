import { combineReducers } from 'redux'
import homepage from './homepage'

// not currently used.  Will be implememnted if the app grows
// to a size which would have multiple pages, and therefor multiple reducers.
// combines those reducers to be used by the overarching app structure.
const reducer = combineReducers({
  homepage
})

export default reducer;
