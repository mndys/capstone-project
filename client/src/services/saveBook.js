import axios from 'axios'

export default function saveBook(bookData) {
  return axios
    .post('/api/books', bookData)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
