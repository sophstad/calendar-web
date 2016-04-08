import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'assets/styles/schedule.styl'

function Schedule() {
  return (
    <div className="container">
      <div className="section six columns">
        <h3>Today&rsquo;s Events</h3>
        <div styleName="index">
          <p><span styleName="time">13:30 </span>Bacchanal 2016</p>
        </div>
      </div>
    </div>
  )
}

export default CSSModules(Schedule, styles)
