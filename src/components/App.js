import { useState } from 'react'
import styled from 'styled-components/macro'
import Button from './Button'
import Header from './Header'
import Prompt from './Prompt'
import prompts from '../data/prompts.json'

function App() {
  const [currentPrompt, setCurrentPrompt] = useState(
    'Spin to receive your first prompt.'
  )

  return (
    <Grid>
      <Header>Wheel of TBR</Header>
      <Main>
        <Prompt>{currentPrompt}</Prompt>
        <FlexWrapper>
          <Button primary onClick={setRandomPrompt}>
            Spin!
          </Button>
        </FlexWrapper>
      </Main>
    </Grid>
  )

  function setRandomPrompt() {
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)]
    setCurrentPrompt(randomPrompt)
  }
}

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
  padding: clamp(30px, 10%, 100px) clamp(15px, 5%, 50px);
  overflow-y: auto;
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-content: center;
`

export default App
