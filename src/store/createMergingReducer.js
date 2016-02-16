/*
 * Allows you to only focus on the changing parts of state.
 * Automatically merges the returned state with the current state.
 */
export default function createMergingReducer(initialState, handlers) {
  return (state = initialState, action) => (
    handlers.hasOwnProperty(action.type) ?
      Object.assign({}, state, handlers[action.type](state, action))
    : state
  )
}
