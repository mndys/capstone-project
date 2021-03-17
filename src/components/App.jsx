import { useState } from 'react'
import styled from 'styled-components/macro'
import Button from './Button'
import Header from './Header'
import Prompt from './Prompt'
import prompts from '../data/prompts.json'
import History from './History'
import loadFromLocal from '../lib/loadFromLocal'
import saveToLocal from '../lib/saveToLocal'
import WheelComponent from './Wheel'

function App() {
  const INITIAL_PROMPT = 'Spin to receive your first prompt.'
  const LAST_PROMPT = `That's it. Reset to start again.`

  const [currentPrompt, setCurrentPrompt] = useState(
    loadFromLocal('currentPrompt') ?? INITIAL_PROMPT
  )
  const [history, setHistory] = useState(loadFromLocal('promptHistory') ?? [])
  const [mustSpin, setMustSpin] = useState(false)

  return (
    <Grid>
      <Header>Wheel of TBR</Header>
      <Main>
        <Prompt data-testid="prompt">{mustSpin ? '...' : currentPrompt}</Prompt>
        <WheelComponent
          winner={currentPrompt}
          mustSpin={mustSpin}
          setMustSpin={setMustSpin}
        />
        <FlexWrapper>
          <Button
            disabled={currentPrompt.includes(LAST_PROMPT) || mustSpin}
            primary
            onClick={onSpin}
          >
            Spin!
          </Button>
          <Button
            disabled={currentPrompt.includes(INITIAL_PROMPT)}
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
    setCurrentPrompt(INITIAL_PROMPT)
    saveToLocal('currentPrompt', INITIAL_PROMPT)
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
      if (currentPrompt === INITIAL_PROMPT) {
        setCurrentPrompt(randomPrompt)
        saveToLocal('currentPrompt', randomPrompt)
        setMustSpin(true)
      } else {
        setCurrentPrompt(randomPrompt)
        setHistory([...history, currentPrompt])
        saveToLocal('currentPrompt', randomPrompt)
        saveToLocal('promptHistory', [...history, currentPrompt])
        setMustSpin(true)
      }
    } else {
      setCurrentPrompt(LAST_PROMPT)
      saveToLocal('currentPrompt', LAST_PROMPT)
      setHistory([...history, currentPrompt])
      saveToLocal('promptHistory', [...history, currentPrompt])
      setMustSpin(false)
    }
  }
}

const Grid = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(70px, 6vh) 1fr;
  margin: 0 auto;
  height: 100vh;
  min-width: 320px;
  max-width: 900px;
`
const Main = styled.main`
  display: grid;
  justify-content: center;
  grid-template-rows: 5em min-content auto;
  grid-template-columns: 1fr;
  padding: clamp(30px, 10%, 100px) clamp(15px, 5%, 50px);
  overflow: hidden auto;
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 20px;
`

export default App
