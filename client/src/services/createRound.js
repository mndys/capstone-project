import axios from 'axios'

export default function createRound(history) {
  return axios
    .post('/api/rounds', history)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
