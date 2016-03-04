import { createAction } from 'redux-actions'
import { TOGGLE_TEXT } from './constants'

export const toggle = createAction(TOGGLE_TEXT)