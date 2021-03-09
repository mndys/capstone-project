import { useState } from 'react'
import styled from 'styled-components/macro'
import Button from './Button'
import Header from './Header'

function App() {
  const prompt = [
    'big book',
    'bought recently',
    'classic',
    'cover colour',
    'dark academia',
    'dnf',
    'fantasy',
    'female protagonist',
    'friend pick',
    'graphic novel',
    'haunted setting',
    'highest rated',
    'lowest rated',
    'male protagonist',
    'un-read author',
    'new-ish',
    'non-fiction',
    'page number',
    'romance',
    'short read',
    'thriller',
  ]

  const [currentPrompt, setCurrentPrompt] = useState('')

  return (
    <Grid>
      <Header>Wheel of TBR</Header>
      <main>
        <FlexWrapper>
          <Button primary onClick={getPrompt}>
            Spin!
          </Button>
        </FlexWrapper>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet
        clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
        nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
        rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
        ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
        elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
        aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
        est Lorem ipsum dolor sit amet.
      </main>
    </Grid>
  )

  function getPrompt() {
    alert('prompt')
    console.log('prompt')
  }
}
/* function App() {
  return <Button handleClick={getPrompt}>Click me!</Button>
  function getPrompt() {
    alert('Hello!')
  }
} */

const Grid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(70px, 6vh) 1fr 6vh;
  margin: 0 auto;
  height: 100vh;
  min-width: 320px;
  max-width: 900px;

  main {
    padding: 10% 5%;
    overflow-y: auto;
  }
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
`

export default App
