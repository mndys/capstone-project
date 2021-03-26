import { useQuery } from 'react-query'

const fetchPlanets = async () => {
  const res = await fetch('http://swapi.dev/api/planets/')
  return res.json()
}

export default function Books() {
  const { data, status } = useQuery('planets', fetchPlanets)
  console.log(data)

  return (
    <div className="Books">
      <h2>Books</h2>
      {data.results.map((result, index) => (
        <p key={index}>{result.name}</p>
      ))}
    </div>
  )
}
