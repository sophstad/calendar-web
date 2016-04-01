import React from 'react'
import { Provider } from 'react-redux'
import { RouterContext } from 'react-router'
import DevTools from 'containers/DevTools'

export default function Root({ store, ...renderProps }) {
  return (
    <Provider store={ store }>
      <div>
        <RouterContext { ...renderProps } />
        <DevTools />
      </div>
    </Provider>
  )
}
