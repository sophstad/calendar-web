import React from 'react'

export default (props) => (
  <div style={ { border: '1px solid black', width: 200 } }>
    <h3>{ 'Counter' }</h3>
    <p>{ 'Current value: ' + props.value }</p>
    <button onClick={ props.handleIncrement }>{ 'Increment' }</button>
    <button onClick={ props.handleDecrement }>{ 'Decrement' }</button>
  </div>
)
