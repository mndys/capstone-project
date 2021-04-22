import axios from 'axios'
import { useQuery } from 'react-query'

export default function useQueryGet(url, key) {
  const fetchData = async () => {
    const { data } = await axios.get(url)
    return data
  }

  const { data, error, isLoading, refetch } = useQuery(key, fetchData, {
    refetchOnWindowFocus: false,
  })

  return { data, error, isLoading, refetch }
}
