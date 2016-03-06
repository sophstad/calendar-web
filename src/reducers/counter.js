import { INCREMENT_COUNTER, DECREMENT_COUNTER } from 'actions/constants'
import createReducer from 'store/createImmutableReducer'

const initialState = {
  value: 0
}

/* A regular reducer */
export default createReducer(initialState, {
  [INCREMENT_COUNTER]: (state, action) => (
    state.update('value', (value) => value + 1)
  ),
  [DECREMENT_COUNTER]: (state, action) => (
    state.update('value', (value) => value - 1)
  )
})
