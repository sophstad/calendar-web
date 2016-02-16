import { fromJS, toJS } from 'immutable'

export default function createImmutableReducer(initialState, handlers) {
  return (state = initialState, action) => (
    handlers.hasOwnProperty(action.type) ?
      handlers[action.type](fromJS(state), action).toJS()
    : state
  )
}
