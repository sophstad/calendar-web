import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import reducers from 'reducers'
import DevTools from 'containers/DevTools'

export default function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk, promiseMiddleware),
      DevTools.instrument()
    )
  )

  if (module.hot)
    module.hot.accept('reducers', () =>
      store.replaceReducer(require('reducers').default)
    )

  return store
}
