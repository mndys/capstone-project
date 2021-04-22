import axios from 'axios'

export default function saveMarkedReadToBook(_id, isMarkedRead) {
  if (isMarkedRead) {
    return axios
      .patch(`/api/books/${_id}`, { read: false })
      .then(response => console.log(response))
      .catch(error => console.log(error))
  }
  return axios
    .patch(`/api/books/${_id}`, { read: true })
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
