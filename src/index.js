import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'store/configureStore'
import Root from 'containers/Root'

const rootElement = document.getElementById('root')
const store = configureStore(window.__INITIAL_STATE__)
const history = syncHistoryWithStore(browserHistory, store)

let render = (App) => ReactDOM.render(App, rootElement)

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

  render = (App) => {
    try {
      renderApp(App)
    } catch (error) {
      renderError(error)
    }
  }

  module.hot.accept('containers/Root', () => {
    setTimeout(() => {
      const HotRoot = require('containers/Root').default
      render(<HotRoot store={ store } history={ history } />)
    })
  })
}

render(<Root store={ store } history={ history } />)
