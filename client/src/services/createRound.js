import axios from 'axios'

export default function createRound(newRound) {
  return axios
    .post('/api/rounds', newRound)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
