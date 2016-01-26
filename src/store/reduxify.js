import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import apply from 'toolbox/apply'

/**
 * Reduxifies a component.
 *
 * @param state     - The name of the desired state. The component will
 *                    be given read-access to this state.
 * @param actions   - An array of actions, or a single actionset. The component will
 *                    be allowed to execute these actions.
 * @param component - The component to be connected.
 * @return the connected component
 */
export default function reduxify({ state, actions, component }) {

  // the component will subscribe to Redux store updates
  var mapStateToProps = (STATE) => ({
    [state]: STATE[state]
  })

  // the component will be provided actions
  if (actions)
    var mapDispatchToProps = (dispatch) => apply(
      actions,
      (action) => bindActionCreators(action, dispatch)
    )

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(component)

}

  // let mapStatesToProps = (state) => apply(
  //   pick(states, state),
  //   (state) => state.toJS()
  // )
