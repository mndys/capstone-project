import axios from 'axios'
require('dotenv').config()

export default function searchGoogleBooks(search) {
  const API_KEY = process.env.REACT_APP_API_KEY

  return axios
    .get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=${API_KEY}`
    )
    .then(
      data => {
        console.log(data.data.items)
        const searchResult = data.data.items
        return searchResult
      },
      error => {
        console.error(error)
      }
    )
}
