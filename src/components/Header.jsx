import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'assets/styles/header'

function Header(props) {
  return (
    <div className="container">
      <div className="section">
        <header>
          <p>Events@CU</p>
          <p>Bookmarks</p>
          <input type="text" placeholder="search" />
        </header>
        <h2 className="heading-date">{ 'this.props.date' }</h2>
        <h1 className="page-heading">{ 'this.props.name' }</h1>
        <h3>{ 'this.props.location' }</h3>
      </div>
    </div>
  )
}

export default CSSModules(Header, styles)
