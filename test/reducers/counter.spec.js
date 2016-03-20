import test from 'ava'
import reducerTest from 'helpers/immutableReducerTest'
import counterReducer from 'reducers/counter.js'
import * as counterActions from 'actions/counter.js'
const num = 4

test('handle increment', reducerTest(
  counterReducer,
  { value: num },
  counterActions.increment(),
  { value: num + 1 }
))

test('handle decrement', reducerTest(
  counterReducer,
  { value: num },
  counterActions.decrement(),
  { value: num - 1 }
))
