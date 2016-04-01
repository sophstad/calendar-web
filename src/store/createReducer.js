
import { fromJS } from 'immutable'

/*
 * Uses <Immutable> type objects to hydrate the state.
 * Isolates Immutable to the reducers.
 */
export default function createImmutableReducer(initialState, handlers) {
  return (state = initialState, action) => (
    handlers.hasOwnProperty(action.type) ?
      handlers[action.type](fromJS(state), action)
    : fromJS(state)
  )
}

export function createSimpleReducer(initialState, handlers) {
  return (state = initialState, action) => (
    handlers.hasOwnProperty(action.type) ?
      handlers[action.type](state, action)
    : state
  )
}
