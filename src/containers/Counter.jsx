import React from 'react'
import Counter from 'components/Counter'
import * as counterActions from 'actions/counterActions'
import reduxify from 'store/reduxify'

class CounterContainer extends React.Component {
  render() {
    return(
      <Counter
        value={ this.props.counter.value }
        handleIncrement={ this.props.counterActions.increment }
        handleDecrement={ this.props.counterActions.decrement }
      />
    )
  }
}

export default reduxify({
  component: CounterContainer,
  state: 'counter',
  actions: { counterActions }
})
