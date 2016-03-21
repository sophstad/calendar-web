import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import { fromJS } from 'immutable'
import reducers from 'reducers'

export default function configureStore(initialState) {
  return createStore(
    reducers,
    fromJS(initialState),
    applyMiddleware(thunk, promiseMiddleware)
  )
}
