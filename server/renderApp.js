import React from 'react'
import configureStore from 'store/configureStore'
import { renderToString } from 'react-dom/server'
import App from 'containers/Root'

export default function renderApp(renderProps) {
  // Create a new Redux store instance
  const store = configureStore()

  // Render the application to a string
  const content = renderToString(
    <App store={ store } { ...renderProps } />
  )

  // Grab the initial state from our Redux store
  const initialState = JSON.stringify(toJS(store.getState()))

  // Send the rendered page back to the client
  return {
    content,
    initialState
  }
}

function toJS(js) {
  for (let el in js) {
    if (!isPlainObj(js[el]) && !Array.isArray(js[el]))
      js[el] = js[el].toJS()
  }
  return js
}

function isPlainObj(value) {
  return value && (value.constructor === Object || value.constructor === undefined);
}

