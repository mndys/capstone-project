import { useEffect } from 'react'

export default function useClickedOutside(ref, callback, state) {
  useEffect(() => {
    function handleOutsideClick(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }

    state && document.addEventListener('click', handleOutsideClick)
    !state && document.removeEventListener('click', handleOutsideClick)
  }, [ref, callback, state])
}
