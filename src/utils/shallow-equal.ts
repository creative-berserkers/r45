/**
 * Compares two object using Object.keys shallowly.
 *
 * @param {Object|undefined} oldState
 * @param {Object|undefined} newState
 * @returns {boolean} true if passed objects are shallowly equal, false otherwise
 */
export default function shallowEqual(oldState:any = {}, newState:any = {}) {
  const resultOldToNew = Object.keys(oldState).reduce((result, oldKey) => {
    return result === true ? result : oldState[oldKey] !== newState[oldKey]
  }, false)

  const resultNewToOld = Object.keys(newState).reduce((result, newKey) => {
    return result === true ? result : oldState[newKey] !== newState[newKey]
  }, false)

  return !resultNewToOld && !resultOldToNew
}