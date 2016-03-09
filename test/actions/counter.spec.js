import test from 'ava'
import { actionTest } from 'redux-ava'
import * as counterActions from 'actions/counter.js'
import * as types from 'actions/constants.js'

test('increment', actionTest(
  counterActions.increment,
  {
    type: types.INCREMENT_COUNTER,
    payload: undefined
  }
))

test('decrement', actionTest(
  counterActions.decrement,
  {
    type: types.DECREMENT_COUNTER,
    payload: undefined
  }
))
