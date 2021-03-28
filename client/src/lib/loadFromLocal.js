export default function loadFromLocal(key) {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    console.log(`could not get item by key "${key}"`)
  }
}
