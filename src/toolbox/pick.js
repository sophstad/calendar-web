/**
 * Copy a subset of an object based on an array of keys
 */
export default (keys, object) => keys.reduce(
  (result, key) => Object.assign(
    result,
    { [key]: object[key] }
  ), {}
)

export function pickEasy(keys, object) {
  let result = {}
  for (key in keys)
    result[key] = object[key]
  return result
}
