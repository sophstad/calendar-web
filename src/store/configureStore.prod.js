import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import reducers from 'reducers'

export default function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(thunk, promiseMiddleware)
  )
}
