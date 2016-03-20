import createSagaMiddleware from 'redux-saga'
import helloSaga from 'sagas/helloSaga'
export const sagaMiddleware = createSagaMiddleware(helloSaga)
