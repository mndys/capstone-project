import styled from 'styled-components/macro'
import prompts from '../data/prompts.json'

export default function PromptInfo({ triggerPrompt, onClick }) {
  return (
    <Overlay onClick={onClick}>
      <div>
        <h2>{triggerPrompt}</h2>
        <p>{prompts[calculateCurrentPromptNumber()].info}</p>
      </div>
    </Overlay>
  )

  function calculateCurrentPromptNumber() {
    return prompts.findIndex(prompt => prompt.option === triggerPrompt)
  }
}

const Overlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  div {
    background: #fff;
    width: clamp(200px, 80vw, 500px);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 1px 2px 6px 0px #333a;
  }
`
