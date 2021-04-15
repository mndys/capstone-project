import axios from 'axios'

export default function clearPrompts() {
  return axios
    .delete('/api/prompts', {})
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
