import { fromJS } from 'immutable'
export default (reducer, state, action, newState) => t => {
  t.same(reducer(fromJS(state), action).toJS(), newState)
}
