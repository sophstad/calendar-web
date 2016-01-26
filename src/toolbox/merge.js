/**
 * Merge objects.
 * (obj1, obj2, obj3) -> {obj1content, obj2content, obj3content}
 */
export default (...args) => args.reduce(
  (result, obj) => Object.assign(result, obj),
  {}
)

export function merge(...args) {
  let result = {}
  for (arg in args)
    Object.assign(result, arg)
  return result
}

/**
 * merge objects, flattening one level.
 * If an object contains an array of objects, flatten.
 * (obj1, obj2, obj3) -> {obj1content, obj2content, obj3content}
 */
export const mergemerge = (...args) => args.map(arg => Array.isArray(arg) ? merge.apply(null, args) : merge(result, arg))
