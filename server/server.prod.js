/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import express from 'express'
import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import { fromJS } from 'immutable'
import Routes from 'Routes'
import calendarApp from 'reducers'

let document = fs.readFileSync(path.resolve('dist/index.html'), 'utf8')

const app = express()
const port = 3000

app.use(serve)
app.use(express.static(path.resolve('dist')))

function serve(req, res, next) {
  match({ routes: Routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message) // this is a bad idea.
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.

      // Send the rendered page back to the client
      if (req.url === '/')
        res.status(200).send(renderApp(renderProps))
      else
        next()
    } else {
      res.status(404).send('Not found')
    }
  })
}

function renderApp(renderProps) {
  // Create a new Redux store instance
  const store = createStore(calendarApp)

  // Render the component to a string
  const html = renderToString(
    <Provider store={ store }>
      <RouterContext {...renderProps} />
    </Provider>
  )

  // Grab the initial state from our Redux store
  const initialState = fromJS(store.getState()).toJS()

  // Send the rendered page back to the client
  return renderFullPage(html, initialState)
}

// sketchy afff
function renderFullPage(html, initialState) {
  const rootExp = /(<div id="root">)/i
  const scriptExp = /(<script)/i
  document = document.replace(rootExp, () => `<div id="root">${ html }`)
  document = document.replace(scriptExp, () => `
    <script>
      window.__INITIAL_STATE__ = ${ JSON.stringify(initialState) }
    </script>
    <script`
  )

  return document
}

app.listen(port, error => error ?
    console.error(error)
  : console.info(`==> 🌎  Listening on port ${ port }. Open up http://localhost:${ port }/ in your browser.`)
)
