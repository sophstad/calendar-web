import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'assets/styles/counter'

function Counter(props) {
  return (
    <div className="container">
      <div className="section">
        <h3 className="section-heading">{ 'Counter' }</h3>
        <p className="section-description">
          { 'Current value: '}
          <span styleName="counter-value">{ props.value }</span>
        </p>
        <button className="button button-primary" onClick={ props.handleIncrement }>{ 'Increment' }</button>
        <button className="button" onClick={ props.handleDecrement }>{ 'Decrement' }</button>
      </div>
    </div>
  )
}

export default CSSModules(Counter, styles)
