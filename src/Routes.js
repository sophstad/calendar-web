import React from 'react'
import { Route, Redirect, IndexRoute } from 'react-router'

/* Pages */
import Home from 'pages/Home'
import NotFound from 'pages/NotFound'

// Needs to be reactified in order to be used as a prop for othe things.
export default (
  <Route path="/">
    <IndexRoute component={ Home } />
    <Redirect from="home" to="/" />
    <Route path="*" component={ NotFound } />
  </Route>
)
