import axios from 'axios'

export default function saveRoundToBook(_id, round) {
  return axios
    .patch(`/api/books/${_id}`, round)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
