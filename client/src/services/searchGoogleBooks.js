import axios from 'axios'
require('dotenv').config()

export default function searchGoogleBooks(search, setSearchResult) {
  const API_KEY = process.env.REACT_APP_API_KEY

  return search
    ? axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${search}&maxResults=40&key=${API_KEY}`
        )
        .then(
          data => {
            const searchResult = data.data.items
            const filteredSearch = searchResult
              .filter(book => {
                if (book.volumeInfo.publisher === undefined) {
                  return false
                }
                if (book.volumeInfo.publisher.match(/grin/i)) {
                  return false
                }
                return true
              })
              .slice(0, 10)
            setSearchResult(filteredSearch)
          },
          error => {
            console.error(error)
          }
        )
    : console.log('search ist ' + { search })
}
