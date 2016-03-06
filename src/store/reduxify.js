import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import apply from 'toolbox/apply'
import merge from 'toolbox/merge'

/*
 * Reduxifies a container.
 *
 * @param selector   - The name of the desired substate, or a function describing
 *                     the selection logic. The selector selects what part of the
 *                     state is given to the container.
 * @param actionSets - An array of actionSets or an object of actionSets.
 *                     If the actionSets are contained in an array, the resulting
 *                     injected prop is a single aggregation of all the actions.
 *                     If the actionSets are contained in an object, multiple props
 *                     are injected, each corresponding to each actionSet.
 * @param actionSet  - A single actionSet object. The actionSet will be injected as
 *                     the 'actions' prop.
 * @param container  - The container to be connected.
 * @return           - If the container was specified, the connected container.
 *                     Otherwise, the enhancer function.
 */
export default function reduxify({ selector, actionSet, actionSets, container }) {
  if (actionSet && actionSets) {
    throw new Error('Reduxify use error - please only define <actionSet> or <actionSets>')
  }

  var mapStateToProps, mapDispatchToProps

  /* the container will subscribe to Redux store updates */
  if (selector) {
    mapStateToProps = typeof selector === 'function' ?
      selector
    : (state) => ({ [selector]: state[selector] })
  }

  /* the container will be provided multiple actionSets */
  if (actionSets) {
    mapDispatchToProps = Array.isArray(actionSets) ?
    // Aggregates actionSets into a single 'actions' prop
      (dispatch) => ({
        actions: bindActionCreators(
          merge.apply(null, actionSets),
          dispatch
        )
      })
    // Injects each actionSet as an individual prop of the container
    : (dispatch) => apply(
        actionSets,
        (actionSet) => bindActionCreators(actionSet, dispatch)
      )
  }

  /* the container will be provided a single actionSet */
  if (actionSet) {
    mapDispatchToProps = (dispatch) => ({
      actions: bindActionCreators(actionSet, dispatch)
    })
  }

  return container ?
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(container)
  : connect(
      mapStateToProps,
      mapDispatchToProps
    )
}
