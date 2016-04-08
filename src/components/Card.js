import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'assets/styles/card.styl'

function Card() {
  return (
    <div className="container">
      <div styleName="card" className="four columns">
        <img src="http://www.etonline.com/news/2015/10/24187336/set_drake_hotling_bling_video-640.jpg" />
        <div styleName="event-information">
          <p>Saturday, Oct 3rd • 9pm</p>
          <h5>Battle of the Bands 2016</h5>
          <p>2920 Broadway, New York, NY 10027</p>
        </div>
        <div styleName="tags">
            <span className="tag">pizza</span>
          </div>
      </div>
    </div>
  )
}

export default CSSModules(Card, styles)
