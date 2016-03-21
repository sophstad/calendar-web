require('../register')
process.env.NODE_ENV === 'production' ?
  require('./server.prod')
: require('./server.dev')
