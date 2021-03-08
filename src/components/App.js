import styled from 'styled-components'

function App() {
  return <Grid>Hello World!</Grid>
}

const Grid = styled.div`
  display: grid;
  height: 100vh;
  place-content: center;
  place-items: center;
`

export default App
