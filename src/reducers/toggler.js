import { TOGGLER } from 'actions/constants'
import createReducer from 'store/createReducer'

const initialState = {
  value: 'hey'
}

/* A regular reducer */
export default createReducer(initialState, {
  [TOGGLER] (state, action) {
    return { value: 'yo' }
  }
})
