import React from 'react'
import ReactDOM from 'react-dom'
import { match, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from 'routes'
import configureStore from 'store/configureStore'

const rootElement   = document.getElementById('root')
const store         = configureStore(window.__INITIAL_STATE__)
const history       = syncHistoryWithStore(browserHistory, store)

let render = () => {
  const App = require('containers/Root').default
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    ReactDOM.render(<App store={ store } {...renderProps} />, rootElement)
  })
}

if (module.hot) {
  // Support hot reloading of components
  // and display an overlay for runtime errors
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')
    ReactDOM.render(
      <RedBox error={error} />,
      rootElement
    )
  }

  render = () => {
    try {
      renderApp()
    } catch (error) {
      renderError(error)
    }
  }

  module.hot.accept('containers/Root', render)
}

render()
