import axios from 'axios'

export default function deleteBook(_id) {
  return axios
    .delete(`/api/books/${_id}`)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
