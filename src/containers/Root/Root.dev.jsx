import React from 'react'
import { Provider } from 'react-redux'
import { browserHistory as history } from 'react-router'
import configureStore from 'store/configureStore'
import Routes from './Routes'

export default (
  <Provider store={ configureStore(history) }>
    <Routes history={ history } />
  </Provider>
)
