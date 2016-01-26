//TODO INSTLALL ESLINT THINGS

import React from 'react'
import { render } from 'react-dom'


import { Provider } from 'react-redux'
import configureStore from 'store/configureStore'


import { Router, Route, Redirect, IndexRoute } from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'
import useScroll from 'scroll-behavior/lib/useStandardScroll'


/* Pages */
import Home from 'pages/Home'
import NotFound from 'pages/NotFound'

import DevTools from 'containers/DevTools'


/* Global styles */
// import 'assets/css/normalize.css'
// import 'assets/css/skeleton.css'
// import 'assets/styles/global.css'


const App = ({ children }) => children
const history = useScroll(createHistory)()

const INDEX = (
  <Provider store={ configureStore(history) }>
    <div>
      <Router history={ history }>
        <Route path="/" component={ App }>
          <IndexRoute component={ Home } />
          <Redirect from="home" to="/" />
          <Route path="*" component={ NotFound } />
        </Route>
      </Router>
      { IN_DEV_MODE ? <DevTools /> : null }
    </div>
  </Provider>
)

render(
  INDEX,
  document.getElementById('content')
)
