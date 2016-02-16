import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import apply from 'toolbox/apply'

/**
 * Reduxifies a container.
 *
 * @param selector  - The name of the desired selector. The selector
 *                    selects what part of the state is given to the container,
 *                    which will then have read-access-only.
 * @param actions   - An array of actions, or a single actionset. The container will
 *                    be allowed to execute these actions.
 * @param container - The container to be connected.
 * @return the connected container
 */
export default function reduxify({ selector, actions, container }) {
  // the container will subscribe to Redux store updates
  if (selector)
    var mapStateToProps = (state) => ({
      [selector]: state[selector]
    })

  // the container will be provided actions
  if (actions)
    var mapDispatchToProps = (dispatch) => apply(
      actions,
      (action) => bindActionCreators(action, dispatch)
    )

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(container)
}
