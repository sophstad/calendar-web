import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'assets/styles/calendar'

function Calendar(props) {
  return (
    <div className="container">
      <div className="section">
        <h3 className="section-heading">{ 'Calendar' }</h3>
        <p className="section-description">
          { 'Current month: '}
          <span>{ props.month }</span>
        </p>
        <button className="button" onClick={ props.decrMonth }>{ '<' }</button>
        <button className="button button-primary" onClick={ props.incrMonth }>{ '>' }</button>
      </div>
    </div>
  )
}

export default CSSModules(Calendar, styles)
