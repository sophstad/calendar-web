import React from 'react'
import Counter from 'components/Counter'
import * as counterActions from 'actions/counterActions'
import reduxify from 'store/reduxify'

class CounterContainer extends React.Component {
  render() {
    console.log("counter")
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
  container: CounterContainer,
  selector: 'counter',
  actionSet: counterActions
})
