import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/*
 * Connects a react component to the redux store.
 *
 * @param state      - The name of the desired substate.
 * @param selector   - a memoized selector function describing selection logic. The selector
 *                     efficiently computes derived data from the store.
 * @param actions    - The actions that will be provided to the connected component.
 *
 * @return           - If the container was specified, the connected container.
 *                     Otherwise, the enhancer function.
 */
export default function reduxify({ state, selector, actions }) {

  /* the container will subscribe to Redux store updates */
  if (state)
    var mapStateToProps = (STATE) => selector ?
      { [state]: selector(STATE) }
    : { [state]: STATE[state] }

  /* the container will be provided actions */
  if (actions)
    var mapDispatchToProps = (dispatch) => ({
      actions: bindActionCreators(actions, dispatch)
    })

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )

}
