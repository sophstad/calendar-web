import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { RouterContext } from 'react-router'
import { fromJS } from 'immutable'
import calendarApp from 'reducers'

export default function renderApp(renderProps) {
  // Create a new Redux store instance
  const store = createStore(calendarApp)

  // Render the component to a string
  const content = renderToString(
    <Provider store={ store }>
      <RouterContext {...renderProps} />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const initialState = JSON.stringify(fromJS(store.getState()).toJS())

  // Send the rendered page back to the client
  return {
    content,
    initialState
  }
}
