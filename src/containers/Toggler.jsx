import React from 'react'
import Toggler from 'components/Toggler'
import * as togglerActions from 'actions/togglerActions'
import reduxify from 'store/reduxify'

class TogglerContainer extends React.Component {
  render() {
    console.log(this.props.toggler)
    return (
      <Toggler
        value={ this.props.toggler.value }
        handleToggler={ this.props.togglerActions.toggler }
      />
    )
  }
}

export default reduxify({
  container: TogglerContainer,
  selector: 'toggler',
  actions: { togglerActions }
})
