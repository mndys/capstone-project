import { useState } from 'react'
import styled from 'styled-components/macro'
import Button from './Button'
import Header from './Header'
import Prompt from './Prompt'
import prompts from '../data/prompts.json'
import History from './History'
import loadFromLocal from '../lib/loadFromLocal'
import saveToLocal from '../lib/saveToLocal'

function App() {
  const INITIALPROMPT = 'Spin to receive your first prompt.'
  const LASTPROMPT = `The Wheel is tired.
  No more spins until you reset.`

  const [currentPrompt, setCurrentPrompt] = useState(
    loadFromLocal('currentPrompt') ?? INITIALPROMPT
  )
  const [history, setHistory] = useState(loadFromLocal('promptHistory') ?? [])

  return (
    <Grid>
      <Header>Wheel of TBR</Header>
      <Main>
        <Prompt data-testid="prompt">{currentPrompt}</Prompt>
        <FlexWrapper>
          <Button
            disabled={currentPrompt.includes(LASTPROMPT)}
            primary
            onClick={onSpin}
          >
            Spin!
          </Button>
          <Button
            disabled={currentPrompt.includes(INITIALPROMPT)}
            onClick={onReset}
          >
            reset
          </Button>
        </FlexWrapper>
        {history.length ? <History history={history} /> : ''}
      </Main>
    </Grid>
  )

  function onReset() {
    setHistory([])
    saveToLocal('promptHistory', [])
    setCurrentPrompt(INITIALPROMPT)
    saveToLocal('currentPrompt', INITIALPROMPT)
  }

  function onSpin() {
    let randomPrompt = prompts[getRandomNumber()]

    function getRandomNumber() {
      return Math.floor(Math.random() * prompts.length)
    }

    if (history.length < prompts.length - 1) {
      while (history.includes(randomPrompt) || currentPrompt === randomPrompt) {
        randomPrompt = prompts[getRandomNumber()]
      }
      if (currentPrompt === INITIALPROMPT) {
        setCurrentPrompt(randomPrompt)
        saveToLocal('currentPrompt', randomPrompt)
      } else {
        setCurrentPrompt(randomPrompt)
        setHistory([...history, currentPrompt])
        saveToLocal('currentPrompt', randomPrompt)
        saveToLocal('promptHistory', [...history, currentPrompt])
      }
    } else {
      setCurrentPrompt(LASTPROMPT)
      saveToLocal('currentPrompt', LASTPROMPT)
      setHistory([...history, currentPrompt])
      saveToLocal('promptHistory', [...history, currentPrompt])
    }
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
  grid-template-rows: 170px min-content auto;
  grid-template-columns: 1fr;
  padding: clamp(30px, 10%, 100px) clamp(15px, 5%, 50px);
  overflow-y: auto;
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 20px;
`

export default App
