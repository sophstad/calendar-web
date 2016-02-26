import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import counter from './counter'
import toggler from './toggler'

const rootReducer = combineReducers({
  routing,
  counter,
  toggler
})

export default rootReducer
