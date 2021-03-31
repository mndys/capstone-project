import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import colors from '../data/colors.json'
import prompts from '../data/prompts.json'
import getRandomPageNumber from '../lib/getRandomPageNumber'
import loadFromLocal from '../lib/loadFromLocal'
import saveToLocal from '../lib/saveToLocal'
import AddBookPage from '../pages/AddBookPage'
import BooksPage from '../pages/BooksPage'
import Button from './Button'
import Header from './Header'
import History from './History'
import LoadingCircles from './LoadingCircles'
import Navigation from './Navigation'
import Prompt from './Prompt'
import PromptInfo from './PromptInfo'
import PromptSpecifier from './PromptSpecifier'
import WheelComponent from './Wheel'
const queryClient = new QueryClient()

function App() {
  const INITIAL_PROMPT = 'Spin to receive your first prompt.'
  const LAST_PROMPT = `That's it. Reset to start again.`

  const [currentPrompt, setCurrentPrompt] = useState(
    loadFromLocal('currentPrompt') ?? INITIAL_PROMPT
  )
  const [history, setHistory] = useState(loadFromLocal('promptHistory') ?? [])
  const [mustSpin, setMustSpin] = useState(false)
  const [showPromptInfo, setShowPromptInfo] = useState(false)
  const [triggerPrompt, setTriggerPrompt] = useState(null)
  function getRandomColorObject() {
    const randomColorNumber = Math.floor(Math.random() * colors.length)
    return colors[randomColorNumber]
  }
  const colorObject = loadFromLocal('colorObject') ?? getRandomColorObject()
  const randomPageNumber =
    loadFromLocal('randomPageNumber') ?? getRandomPageNumber()

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Grid>
          <Header>Wheel of TBR</Header>
          {showPromptInfo && (
            <PromptInfo
              triggerPrompt={triggerPrompt}
              onToggleShowPromptInfo={toggleShowPromptInfo}
              {...{ prompts, colorObject, randomPageNumber }}
            />
          )}
          <Main showPromptInfo={showPromptInfo}>
            <Switch>
              <Route exact path="/">
                <Prompt
                  data-testid="prompt"
                  {...(currentPrompt !== INITIAL_PROMPT &&
                  currentPrompt !== LAST_PROMPT &&
                  !mustSpin
                    ? { onClick: toggleShowPromptInfo }
                    : '')}
                >
                  {mustSpin ? <LoadingCircles /> : currentPrompt}
                  {(!mustSpin && currentPrompt === 'Cover Colour') ||
                  (!mustSpin && currentPrompt === 'Page Number')
                    ? `:
          `
                    : ''}
                  {(!mustSpin && currentPrompt === 'Cover Colour') ||
                  (!mustSpin && currentPrompt === 'Page Number') ? (
                    <PromptSpecifier
                      {...{ currentPrompt, colorObject, randomPageNumber }}
                    />
                  ) : (
                    ''
                  )}
                </Prompt>
                <WheelComponent
                  winner={currentPrompt}
                  {...{ mustSpin, setMustSpin }}
                />
                <GridWrapper>
                  <Button
                    disabled={currentPrompt.includes(LAST_PROMPT) || mustSpin}
                    primary
                    autoFocus
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
                </GridWrapper>
                {history.length ? (
                  <History
                    history={history}
                    onToggleShowPromptInfo={toggleShowPromptInfo}
                  />
                ) : (
                  ''
                )}
              </Route>
              <Route path="/tbr">
                <BooksPage />
              </Route>
              <Route path="/monthly-tbr">
                <div>Monthly TBR</div>
              </Route>
              <Route path="/add">
                <AddBookPage />
              </Route>
            </Switch>
          </Main>
          <Navigation showPromptInfo={showPromptInfo} />
        </Grid>
      </QueryClientProvider>
    </Router>
  )

  function toggleShowPromptInfo(event) {
    setShowPromptInfo(!showPromptInfo)
    if (
      !event.target.className.includes('Prompt') &&
      !event.target.className.includes('PromptSpecifier') &&
      event.target.className !== ''
    ) {
      setTriggerPrompt(event.target.innerText)
    } else {
      setTriggerPrompt(currentPrompt)
    }
  }

  function onReset() {
    setHistory([])
    saveToLocal('promptHistory', [])
    setCurrentPrompt(INITIAL_PROMPT)
    saveToLocal('currentPrompt', INITIAL_PROMPT)
    saveToLocal('colorObject', getRandomColorObject())
    saveToLocal('randomPageNumber', getRandomPageNumber())
  }

  function onSpin() {
    let randomPrompt = prompts[getRandomNumber()].option

    function getRandomNumber() {
      return Math.floor(Math.random() * prompts.length)
    }

    if (history.length < prompts.length - 1) {
      while (history.includes(randomPrompt) || currentPrompt === randomPrompt) {
        randomPrompt = prompts[getRandomNumber()].option
      }
      if (currentPrompt === INITIAL_PROMPT) {
        setCurrentPrompt(randomPrompt)
        setTriggerPrompt(randomPrompt)
        saveToLocal('currentPrompt', randomPrompt)
        setMustSpin(true)
      } else {
        setCurrentPrompt(randomPrompt)
        setTriggerPrompt(randomPrompt)
        setHistory([...history, currentPrompt])
        saveToLocal('currentPrompt', randomPrompt)
        saveToLocal('promptHistory', [...history, currentPrompt])
        saveToLocal('colorObject', colorObject)
        saveToLocal('randomPageNumber', randomPageNumber)
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
  ${props => props.showPromptInfo && 'filter: blur(2px); z-index: -1'};
`

const GridWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 20px;
`

export default App
