import { NEXT_MONTH, PREV_MONTH } from 'actions/constants'
import createReducer from 'store/createImmutableReducer'
import moment from 'moment'

const initialState = {
  date: moment()
}

/* A regular reducer */
export default createReducer(initialState, {
  [NEXT_MONTH]: (state, action) => (
    state.update('date', date => date.add(1, 'months'))
  ),
  [PREV_MONTH]: (state, action) => (
    state.update('date', date => date.subtract(1, 'months'))
  )
})
