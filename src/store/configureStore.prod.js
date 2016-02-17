import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import reducers from 'reducers'

export default function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(syncHistory(browserHistory), thunk)
  )
}
