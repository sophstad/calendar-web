import { combineReducers } from 'redux'
import { routeReducer as routing } from 'redux-simple-router'
import counter from './counter'

const rootReducer = combineReducers({
  routing,
  counter
})

export default rootReducer
