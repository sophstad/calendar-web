import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'assets/styles/header'

function Header(props) {
  return (
    <div className="container">
      <div className="section">
        <header styleName="nav">
          <h2>Events@CU</h2>
          <div styleName="right">
            <p>Bookmarks</p>
            <input type="text" placeholder="search" />
          </div>
        </header>
        <h2 className="heading-date">{ 'this.props.date' }</h2>
        <h1 className="page-heading">{ 'this.props.name' }</h1>
        <div className="button" styleName="button">{ 'Learn More' }</div>
        <h3>{ 'this.props.location' }</h3>
      </div>
    </div>
  )
}

export default CSSModules(Header, styles)
