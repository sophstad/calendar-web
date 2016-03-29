import React from 'react'
import configureStore from 'store/configureStore'
import { renderToString } from 'react-dom/server'
import { fromJS } from 'immutable'
import App from 'containers/Root'

export default function renderApp(renderProps) {
  // Create a new Redux store instance
  const store = configureStore()

  // Render the application to a string
  const content = renderToString(
    <App store={ store } { ...renderProps } />
  )

  // Grab the initial state from our Redux store
  const initialState = JSON.stringify(fromJS(store.getState()).toJS())

  // Send the rendered page back to the client
  return {
    content,
    initialState
  }
}
