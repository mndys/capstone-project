export default function getRandomPageNumber() {
  const MAX_PAGES = 600
  const MIN_PAGES = 100
  return Math.floor(Math.random() * (MAX_PAGES - MIN_PAGES) + MIN_PAGES)
}
