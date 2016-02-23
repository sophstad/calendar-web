import React from 'react'
import { Provider } from 'react-redux'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from 'store/configureStore'
import Routes from './Routes'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

export default (
  <Provider store={ store }>
    <Routes history={ history } />
  </Provider>
)
