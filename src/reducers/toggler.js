import { TOGGLE_TEXT } from 'actions/constants'
import createReducer from 'store/createReducer'

const initialState = {
  value: 'hey'
}

/* A regular reducer */
export default createReducer(initialState, {
  [TOGGLE_TEXT] (state, action) {
    if (state.value == 'yo')
      return { value: 'hey' }
    else
      return { value: 'yo' }
  }
})
