import axios from 'axios'

export default function saveBookToRound(newBook) {
  return axios
    .post('/api/rounds', newBook)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
