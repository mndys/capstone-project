import axios from 'axios'

const resources = {}

export default function startIntelligentSearch() {
  let cancel

  return async query => {
    if (cancel) {
      // Cancel the previous request before making a new request
      cancel.cancel()
    }
    // Create a new CancelToken
    cancel = axios.CancelToken.source()
    try {
      if (resources[query]) {
        // Return data if it exists
        return resources[query]
      }
      const res = await axios(query, { cancelToken: cancel.token })

      const data = res.data.results
      // Store response
      resources[query] = data

      return data
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        console.log('Request canceled', error.message)
      } else {
        // Handle usual errors
        console.error('Something went wrong: ', error.message)
      }
    }
  }
}
