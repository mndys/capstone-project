import axios from 'axios'

export default function saveBookToRound(book) {
  return axios
    .patch('/api/rounds', book)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
