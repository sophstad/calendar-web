import React from 'react'

/* Containers */
// import MyContainer from 'containers/MyContainer'
import Counter from 'containers/Counter'
import Toggler from 'containers/Toggler'
import Header from 'components/Header'
import Calendar from 'containers/Calendar'
import Search from 'components/Search'

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
        <Calendar />
        <Counter />
        <Toggler />
      </div>
    )
  }
}
