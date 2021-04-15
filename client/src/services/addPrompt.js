import axios from 'axios'
import prompts from '../data/prompts.json'

export default function addPrompt(currentPrompt) {
  const promptObject = prompts[calculateCurrentPromptNumber()]

  function calculateCurrentPromptNumber() {
    return prompts.findIndex(prompt => prompt.option === currentPrompt)
  }

  return axios
    .post('/api/prompts', promptObject)
    .then(response => console.log(response))
    .catch(error => console.log(error))
}
