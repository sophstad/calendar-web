import { NEXT_MONTH, PREV_MONTH } from 'actions/constants'
import createReducer from 'store/createImmutableReducer'
import moment from 'moment'

const initialState = {
  date: moment()
}

/* A regular reducer */
export default createReducer(initialState, {
  [NEXT_MONTH]: (state, action) => (
    state.update('date', moment() => moment().add(1, 'months'))
  ),
  [PREV_MONTH]: (state, action) => (
    state.update('month', moment() => moment.subtract(1, 'months'))
  ),
  [SELECT_DATE]: (state, action) => (
  )
})
