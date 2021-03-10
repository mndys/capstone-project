import { useState } from 'react'
import styled from 'styled-components/macro'
import Button from './Button'
import Header from './Header'
import Prompt from './Prompt'

function App() {
  const prompts = [
    'Big Book',
    'Bought Recently',
    'Classic',
    'Cover Colour',
    'Dark Academia',
    'DNF',
    'Fantasy',
    'Feminine Protagonist',
    'Friend Pick',
    'Graphic Novel',
    'Haunted Setting',
    'Highest Rated',
    'Lowest Rated',
    'Masculine Protagonist',
    'Un-Read Author',
    'New-ish',
    'Non-Fiction',
    'Page Number',
    'Romance',
    'Short Read',
    'Thriller',
  ]

  const [currentPrompt, setCurrentPrompt] = useState(
    'Spin to receive your first prompt.'
  )

  return (
    <Grid>
      <Header>Wheel of TBR</Header>
      <Main>
        <Prompt>{currentPrompt}</Prompt>
        <FlexWrapper>
          <Button primary onClick={getPrompt}>
            Spin!
          </Button>
        </FlexWrapper>
      </Main>
    </Grid>
  )

  function getPrompt() {
    var randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
    setCurrentPrompt(randomPrompt)
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
`
const Main = styled.main`
  display: grid;
  justify-content: center;
  grid-template-rows: 150px 1fr auto;
  padding: 10% 5%;
  overflow-y: auto;
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
`

export default App
