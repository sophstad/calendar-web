import { fromJS, toJS } from 'immutable'

/*
 * Uses <Immutable> type objects to hydrate the state.
 * Isolates Immutable to the reducers.
 */
export default function createImmutableReducer(initialState, handlers) {
  return (state = initialState, action) => (
    handlers.hasOwnProperty(action.type) ?
      handlers[action.type](fromJS(state), action).toJS()
    : state
  )
}
