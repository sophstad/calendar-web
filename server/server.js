/* eslint-disable no-console */
import fs from 'fs'
import path from 'path'
import express from 'express'
import ejs from 'ejs'
import httpProxy from 'http-proxy'
import { match } from 'react-router'
import Routes from 'routes'
import renderApp from './renderApp'
import webpack from 'webpack'
const webpackConfig = process.env.NODE_ENV === 'production' ?
  require('../webpack.config.prod.js')
: require('../webpack.config.dev.js')

const app = express()
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000
const compiler = webpack(webpackConfig)
var getDocument

/* 
 * In development, use webpack middleware to compile and serve files from memory, as well as HMR.
 * In production, assume files are compiled and serve statically from 'dist' directory.
 */
if (process.env.NODE_ENV === 'production') {
  compiler.run((err, stats) => {
    if (err)
      console.error(err)

    console.log(stats.toString({
      // output options
      chunks: false,
      colors: true
    }))
  })

  app.use(express.static(path.resolve('dist')))
  getDocument = () => fs.readFileSync(path.resolve('dist/index.ejs'), 'utf8')
} else {
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      chunks: false,
      colors: true
    }
  }))
  app.use(webpackHotMiddleware(compiler))

  getDocument = () => {
    const memoryFs = compiler.outputFileSystem
    const indexPath = path.resolve(process.cwd(), 'dist/index.ejs')
    return memoryFs.readFileSync(indexPath, 'utf8')
  }
}

const apiProxy = httpProxy.createProxyServer()

/* Proxy api requests */
// TODO all -> use
app.all('/api/*', (req, res) => {
  apiProxy.web(req, res, { target: {
    host: 'localhost',
    port: 5000
  }})
})

app.use(serve)

function serve(req, res) {
  match({ routes: Routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message) // this is a bad idea.
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your 'not found' component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.

      // Send the rendered page back to the client
      res.status(200).send(ejs.render(getDocument(), renderApp(renderProps)))
    } else {
      res.status(404).send('Not found')
    }
  })
}


app.listen(port, error => error ?
    console.error(error)
  : console.info(`==> 🌎  Listening on port ${ port }. Open up http://localhost:${ port }/ in your browser.`)
)
