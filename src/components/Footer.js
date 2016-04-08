import React from 'react'
import CSSModules from 'react-css-modules'
import styles from 'assets/styles/footer.styl'

function Footer(props) {
  return (
    <div className="container">
      <div className="six columns">
        <p>
          Maintained by <a href="http://adicu.com">ADI Labs</a>
        </p>
      </div>
      <div className="six columns right">
        <p className="right">
          <a href="mailto:labs@adicu.com?subject=[Events @ CU]">Report a bug or suggest a feature</a>
        </p>
      </div>
    </div>
  )
}

export default CSSModules(Footer, styles)
