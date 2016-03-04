import { TOGGLE_TEXT } from 'actions/constants'
import createReducer from 'store/createImmutableReducer'

const initialState = {
  value: 'hey'
}

/* A regular reducer */
export default createReducer(initialState, {
  [TOGGLE_TEXT]: (state, action) => (
    (state.get('value') == 'hey') ? state.update('value', value => 'yo') : state.update('value', value => 'hey')
  )
})
