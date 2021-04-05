import axios from 'axios'

export default async function saveBookToRound(newBook) {
  return axios.post('/api/rounds', newBook).then(
    response => {
      console.log(response)
    },
    error => {
      console.log(error)
    }
  )
}
