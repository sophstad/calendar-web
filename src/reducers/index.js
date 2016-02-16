import { combineReducers } from 'redux'
import { routeReducer as routing } from 'react-router-redux'
import counter from './counter'

const rootReducer = combineReducers({
  routing,
  counter
})

export default rootReducer
