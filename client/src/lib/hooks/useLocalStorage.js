import { useEffect, useState } from 'react'

export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    return loadFromLocal(key, initialValue)
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [value, key])

  return [value, setValue]
}

function loadFromLocal(key, initialValue) {
  const savedValue = JSON.parse(localStorage.getItem(key))
  if (savedValue) return savedValue

  if (initialValue instanceof Function) return initialValue()
  return initialValue
}
