import axios from 'axios'

export default function saveBookToPrompt(_id, book) {
  return axios
    .patch(`/api/prompts/${_id}`, book)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
