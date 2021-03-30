import { useQuery } from 'react-query'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'

const fetchPlanets = async () => {
  const res = await fetch('http://swapi.dev/api/planets/')
  return res.json()
}

export default function AddBookPage() {
  const { data, status } = useQuery('planets', fetchPlanets, {
    staleTime: 2000,
    refetchOnWindowFocus: false,
  })
  console.log(data)

  return (
    <div className="Books">
      <h2>Books</h2>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' &&
        data.results.map((result, index) => <p key={index}>{result.name}</p>)}
      <ReactQueryDevtoolsPanel />
    </div>
  )
}
