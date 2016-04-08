import React from 'react'
import Counter from 'components/Counter'
import { increment, decrement } from 'actions/counter'
import reduxify from 'store/reduxify'

class CounterContainer extends React.Component {
  render() {
    return (
      <Counter
        value={ this.props.counter.get('value') }
        handleIncrement={ this.props.actions.increment }
        handleDecrement={ this.props.actions.decrement }
      />
    )
  }
}

export default reduxify({
  state: 'counter',
  actions: { increment, decrement }
})(CounterContainer)
