module.exports = __DEV__ ?
  require('./configureStore.dev')
: require('./configureStore.prod')
