import React from 'react'

/* Containers */
// import MyContainer from 'containers/MyContainer'
import Counter from 'containers/Counter'
import Calendar from 'containers/Calendar'

import Header from 'components/Header'
import Search from 'components/Search'
import Schedule from 'components/Schedule'
import Card from 'components/Card'
import Footer from 'components/Footer'
import Modal from 'components/Modal'

/* Components */
// import MyComponent from 'components/MyComponent'

/* Assets */
// import MyAsset from 'assets/MyAsset'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Search />
        <Schedule />
        <Card />
        <Footer />
        <Modal />
      </div>
    )
  }
}
