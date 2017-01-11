export default function filterFirst(array, element){
  let found = false
  let newArray= []
  array.forEach(el => {
    if(el != element || found){
      newArray.push(el)
    } else {
      found = true
    }
  })
  return newArray
}