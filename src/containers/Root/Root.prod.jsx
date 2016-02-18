import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'
import Routes from './Routes'

export default (
  <Provider store={ configureStore() }>
    <Routes />
  </Provider>
)
