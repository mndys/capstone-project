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
  const LAST_PROMPT = `The Wheel is tired.
  No more spins until you reset.`

  const [currentPrompt, setCurrentPrompt] = useState(
    loadFromLocal('currentPrompt') ?? INITIAL_PROMPT
  )
  const [history, setHistory] = useState(loadFromLocal('promptHistory') ?? [])
  const [mustSpin, setMustSpin] = useState(false)

  return (
    <Grid>
      <Header>Wheel of TBR</Header>
      <Main>
        <Prompt data-testid="prompt">{currentPrompt}</Prompt>
        <WheelComponent
          winner={currentPrompt}
          mustSpin={mustSpin}
          setMustSpin={setMustSpin}
        />
        <FlexWrapper>
          <Button
            disabled={currentPrompt.includes(LAST_PROMPT)}
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
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae sed
        accusantium error obcaecati reiciendis nemo exercitationem quis quasi
        nisi, debitis quam? Veritatis dignissimos neque placeat corporis,
        accusamus facere quibusdam, obcaecati vel nam expedita in est fugit a?
        Iusto ex provident, inventore debitis facere beatae adipisci veritatis
        placeat quisquam earum delectus dolor dolores asperiores atque, maxime
        libero porro, reprehenderit quos animi laudantium vero. Necessitatibus
        facere perspiciatis labore distinctio ad cupiditate, iste, et doloribus
        inventore saepe ea? Deleniti hic voluptate nemo nam commodi accusamus,
        repellat voluptatem, optio laboriosam quod eos maiores, non iste nulla
        provident perspiciatis ut explicabo aspernatur porro omnis quaerat? Sint
        laborum ex ipsa molestiae eaque soluta mollitia culpa perspiciatis
        molestias aspernatur quos nam nemo accusamus voluptatum vero eius rem
        amet minus praesentium atque, temporibus qui! Quisquam mollitia debitis
        eos natus totam recusandae soluta, quod placeat fugiat cumque, at neque?
        Tempora ad nulla nobis voluptate. Quidem quas eveniet tenetur est atque
        expedita praesentium asperiores mollitia rerum dicta tempora aut,
        perferendis nisi modi, ut sed et vel. Itaque deserunt soluta praesentium
        in facilis illo quidem pariatur, ullam minima. Unde optio quaerat
        laudantium quae, repudiandae perspiciatis! Quibusdam veritatis cumque
        tenetur dolore explicabo corporis molestiae quam reprehenderit, odit
        aperiam perspiciatis praesentium placeat. Sunt libero harum ex excepturi
        necessitatibus, tempora enim debitis dignissimos sapiente dicta officia
        nemo laboriosam recusandae nobis obcaecati reprehenderit, vero cum
        eveniet porro velit, vitae odio consequatur? Laudantium, quam rem?
        Repellendus, alias illum voluptatem quia dolorem reprehenderit? Enim
        tenetur ipsum molestias temporibus sunt. Sint natus, quaerat asperiores
        temporibus cumque dolor labore nisi sunt, optio tenetur earum mollitia
        delectus sed magni numquam voluptates officia commodi maiores assumenda
        doloremque? Quae velit debitis laboriosam maiores. Odio quas voluptate
        excepturi inventore qui ab delectus, repudiandae natus dolorem placeat
        numquam beatae ipsa commodi vitae, odit pariatur fugiat laborum maxime
        dolor. Deserunt sequi sed explicabo mollitia ipsa accusamus illum et
        doloremque eligendi, odio cumque consequuntur, eius ut quam, cum
        molestias magnam? Vel dicta pariatur accusamus at! Corporis consequatur
        necessitatibus magnam quidem vel, saepe nam, ducimus delectus provident
        sit sint soluta fugiat minima repellat autem consequuntur quaerat?
        Doloribus tenetur culpa distinctio dignissimos possimus quis recusandae,
        dolorem officia, asperiores at voluptatum itaque ipsam omnis veritatis,
        quia earum tempora ullam molestiae non! Minima illum cum repellendus
        aliquid tempore odio vel inventore ut facere. Cumque labore atque rerum
        iste earum id, enim facere modi ut iusto? Eligendi enim alias
        temporibus, nesciunt sit doloremque quia minus fugiat deleniti odit
        inventore eum obcaecati reiciendis molestias omnis, fugit corporis
        blanditiis autem debitis. Expedita eaque perferendis dolore et quaerat
        officia dolorem, est obcaecati a praesentium non sapiente deleniti iste
        delectus necessitatibus deserunt eligendi reprehenderit eos accusamus
        vitae consequatur quae consectetur, veniam quidem. Cumque, commodi
        temporibus magnam quisquam hic nesciunt impedit nemo? Beatae non
        doloremque id debitis asperiores, hic obcaecati reprehenderit ipsum
        laboriosam consequatur incidunt sequi exercitationem eligendi porro
        velit repellendus? Repudiandae magnam perferendis natus, quasi quo
        facilis, ab corrupti repellat, numquam ut dolorum minima eaque atque
        quae voluptatibus. Nesciunt, nisi? Sed, officiis, explicabo, deleniti
        numquam et dicta incidunt odit fugit eveniet nisi ullam perspiciatis
        debitis!
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
  overflow-x: hidden;
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 20px;
`

export default App
