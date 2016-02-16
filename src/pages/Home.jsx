import React from 'react'

/* Containers */
// import MyContainer from 'containers/MyContainer'
import Counter from 'containers/Counter'

/* Components */
// import MyComponent from 'components/MyComponent'

/* Assets */
// import MyAsset from 'assets/MyAsset'


export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>{ 'Home Page' }</h1>
        <Counter />
      </div>
    )
  }
}
