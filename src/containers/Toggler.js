import React from 'react'
import Toggler from 'components/Toggler'
import { toggle } from 'actions/toggler'
import reduxify from 'store/reduxify'

class TogglerContainer extends React.Component {
  render() {
    return (
      <Toggler
        value={ this.props.toggler.get('value') }
        handleToggle={ this.props.actions.toggle }
      />
    )
  }
}

export default reduxify({
  state: 'toggler',
  actions: { toggle }
})(TogglerContainer)
