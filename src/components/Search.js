import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'assets/styles/search.styl'

function Search(props) {
  return (
    <div className="container">
      <div className="section">
        <input type="text" />
        <input type="submit" />
      </div>
    </div>
  )
}

export default CSSModules(Search, styles)
