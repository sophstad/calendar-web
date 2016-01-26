/**
 * Return a new object with a function applied on each element of the original object
 */
export default (object, callback) => Object.keys(object).reduce(
  (result, key) => Object.assign(
    result,
    { [key]: callback(object[key]) }
  ), {}
)
