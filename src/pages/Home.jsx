import React from 'react'

/* Containers */
import Counter from 'containers/Counter'

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
