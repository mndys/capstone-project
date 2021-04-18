import axios from 'axios'

export default function savePromptToBook(_id, prompt) {
  return axios
    .patch(`/api/books/${_id}`, prompt)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
