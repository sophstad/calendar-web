import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'assets/styles/header.styl'

function Header() {
  return (
    <div styleName="header">
      <div className="container">
        <div className="section">
          <nav styleName="nav">
            <span className="five columns"><h2>Events@CU</h2></span>
            <div className="seven columns">
              <input type="text" placeholder="Search for events" className="right" />
            </div>
          </nav>
          <h2 className="heading-date">{ 'this.props.date' }</h2>
          <h1 className="page-heading">{ 'this.props.name' }</h1>
          <div className="button">{ 'Learn More' }</div>
          <h3 styleName="location">{ 'this.props.location' }</h3>
        </div>
      </div>
    </div>
  )
}

export default CSSModules(Header, styles)
