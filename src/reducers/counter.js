import { INCREMENT_COUNTER, DECREMENT_COUNTER } from 'actions/constants'
import createReducer from 'store/createReducer'

const initialState = {
  value: 0
}

/* A regular reducer */
export default createReducer(initialState, {
  [INCREMENT_COUNTER] (state, action) {
    return { value: state.value + 1 }
  },
  [DECREMENT_COUNTER] (state, action) {
    return { value: state.value - 1 }
  }
})
