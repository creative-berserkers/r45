export default function uniqueArray(array) {
  const n = {},r=[]
  for(let i = 0; i < array.length; i++) {
    if (!n[array[i]]) {
      n[array[i]] = true
      r.push(array[i])
    }
  }
  return r
}