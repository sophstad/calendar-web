/* global __DEV__ */
import React from 'react'
import { render } from 'react-dom'

import ROOT from 'containers/Root'

if (__DEV__) {
  const RedBox = require('redbox-react')
  try {
    render(ROOT, document.getElementById('root'))
  } catch (e) {
    render(<RedBox error={ e } />, document.getElementById('root'))
  }
} else {
  render(ROOT, document.getElementById('root'))
}
