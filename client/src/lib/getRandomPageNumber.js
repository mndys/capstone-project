import saveToLocal from './saveToLocal'

export default function getRandomPageNumber() {
  const MAX_PAGES = 600
  const MIN_PAGES = 100
  const randomPageNumber = Math.floor(
    Math.random() * (MAX_PAGES - MIN_PAGES) + MIN_PAGES
  )
  saveToLocal('randomPageNumber', randomPageNumber)
  return randomPageNumber
}
