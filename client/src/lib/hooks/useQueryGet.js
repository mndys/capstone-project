import axios from 'axios'
import { useQuery } from 'react-query'

export default function useQueryGet(url) {
  const fetchRounds = async () => {
    const { data } = await axios.get(url)
    return data[0]
  }

  const { isSuccess, isLoading, isError, data } = useQuery(
    'yourCurrentTBR',
    fetchRounds,
    {
      refetchOnWindowFocus: false,
    }
  )

  return { isSuccess, isLoading, isError, data }
}
