import { createStore, applyMiddleware, compose } from 'redux'
import { browserHistory } from 'react-router'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import reducers from 'reducers'
import DevTools from 'containers/DevTools'
const reduxRouterMiddleware = syncHistory(browserHistory)

export default function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk, reduxRouterMiddleware),
      DevTools.instrument()
    )
  )

  reduxRouterMiddleware.listenForReplays(store)

  if (module.hot)
    module.hot.accept('reducers', () =>
      store.replaceReducer(require('reducers').default)
    )

  return store
}
