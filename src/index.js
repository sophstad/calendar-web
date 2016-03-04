import { createElement } from 'react'
import { render } from 'react-dom'

import ROOT from 'containers/Root'

if (__DEV__) {
  try {
    render(ROOT, document.getElementById('root'))
  } catch (error) {
    render(
      createElement(require('redbox-react'), { error }),
      document.getElementById('root')
    )
  }
} else {
  render(ROOT, document.getElementById('root'))
}
