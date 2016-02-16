import { createStore, applyMiddleware, compose } from 'redux'
import { syncHistory } from 'react-router-redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import reducers from 'reducers'

export default function configureStore(history) {
  const reduxRouterMiddleware = syncHistory(history)

  const finalCreateStore = compose(
    // Middleware you want to use in development:
    applyMiddleware(
      reduxRouterMiddleware,
      thunk,
      promiseMiddleware
    ),
    // Other store enhancers if you use any
    // ...
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )(createStore)

  const store = finalCreateStore(reducers)
  reduxRouterMiddleware.listenForReplays(store)

  if (module.hot)
    module.hot.accept('reducers', () =>
      store.replaceReducer(require('reducers').default)
    )

  return store
}
