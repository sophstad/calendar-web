import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'assets/styles/toggler'

function Toggler(props) {
  return (
    <div className="container">
      <div className="section">
        <h3 className="section-heading">{ 'Toggler' }</h3>
        <p className="section-description">
          { 'Current value: '}
          <span>{ props.value }</span>
        </p>
        <button className="button" onClick={ props.handleToggler }>{ 'Toggler' }</button>
      </div>
    </div>
  )
}

export default CSSModules(Toggler, styles)
