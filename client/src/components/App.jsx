import { useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import colors from '../data/colors.json'
import prompts from '../data/prompts.json'
import getRandomPageNumber from '../lib/getRandomPageNumber'
import loadFromLocal from '../lib/loadFromLocal'
import saveToLocal from '../lib/saveToLocal'
import AddBookPage from './_pages/AddBookPage'
import BooksPage from './_pages/BooksPage'
import Button from './Style/Styled-Components/Button'
import Header from './Sitewide/Header'
import History from './Wheel/History'
import LoadingCircles from './Wheel/LoadingCircles'
import Navigation from './Sitewide/Navigation'
import Prompt from './Style/Styled-Components/Prompt'
import PromptInfo from './Wheel/PromptInfo'
import PromptSpecifier from './Wheel/PromptSpecifier'
import WheelComponent from './Wheel/Wheel'
import MonthlyTbr from './_pages/MonthlyTbr'
import ff from '../images/fast-forward.svg'

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
    const colorObject = colors[randomColorNumber]
    saveToLocal('colorObject', colorObject)
    return colorObject
  }
  const colorObject = loadFromLocal('colorObject') ?? getRandomColorObject()
  const randomPageNumber =
    loadFromLocal('randomPageNumber') ?? getRandomPageNumber()

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Grid>
          <Header>Wheel of TBR</Header>
          {mustSpin && (
            <img
              id="ff"
              src={ff}
              alt="fast forward animation"
              onClick={() => window.location.reload()}
            />
          )}
          {showPromptInfo && (
            <PromptInfo
              triggerPrompt={triggerPrompt}
              onToggleShowPromptInfo={toggleShowPromptInfo}
              {...{ prompts, colorObject, randomPageNumber }}
            />
          )}
          <Main showPromptInfo={showPromptInfo}>
            <Switch>
              <Route path="/tbr">
                <BooksPage />
              </Route>
              <Route path="/monthly-tbr">
                <MonthlyTbr history={history} setHistory={setHistory} />
              </Route>
              <Route path="/add">
                <AddBookPage />
              </Route>
              <Route path="/">
                <WheelPage>
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
                      resetHistory={onReset}
                    />
                  ) : (
                    ''
                  )}
                </WheelPage>
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
    getRandomColorObject()
    getRandomPageNumber()
  }

  function onSpin() {
    let randomPrompt = prompts[getRandomNumber()].option

    function getRandomNumber() {
      return Math.floor(Math.random() * prompts.length)
    }

    if (history.length < prompts.length) {
      const WHEEL_ANIMATION_DURATION = 11000

      while (history.includes(randomPrompt) || currentPrompt === randomPrompt) {
        randomPrompt = prompts[getRandomNumber()].option
      }
      setCurrentPrompt(randomPrompt)
      setTriggerPrompt(randomPrompt)
      saveToLocal('currentPrompt', randomPrompt)
      window.setTimeout(() => {
        setHistory([...history, randomPrompt])
      }, WHEEL_ANIMATION_DURATION)
      saveToLocal('promptHistory', [...history, randomPrompt])
      setMustSpin(true)
    } else {
      setCurrentPrompt(LAST_PROMPT)
      saveToLocal('currentPrompt', LAST_PROMPT)
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
  overflow: hidden;

  #ff {
    position: absolute;
    top: 51vh;
    width: 20px;
    left: 50.5%;
    transform: translate(-50%);
    cursor: pointer;
  }
`
const Main = styled.main`
  padding: clamp(30px, 10%, 100px) clamp(15px, 5%, 50px);
  overflow: hidden auto;
  ${props => props.showPromptInfo && 'filter: blur(2px); z-index: -1'};
`
const WheelPage = styled.main`
  display: grid;
  justify-content: center;
  grid-template-rows: 5em min-content auto;
  grid-template-columns: 1fr;
`

export const GridWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 20px;
`

export default App
