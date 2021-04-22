import styled from 'styled-components/macro'

export default function ChoosePromptModal({
  triggerPrompt,
  onToggleShowPromptInfo,
  history,
}) {
  return (
    <Modal data-testid="promptInfo" onClick={onToggleShowPromptInfo}>
      <div>
        <h2>{triggerPrompt}</h2>
        <ul>
          {history.history.map(item => (
            <li>{item}</li>
          ))}
        </ul>
        {console.log(history)}
      </div>
    </Modal>
  )
}

const Modal = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  & > div {
    background: linear-gradient(#fff 0%, var(--color-platinum) 100%);
    width: clamp(200px, 80vw, 500px);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 1px 2px 6px 0px var(--color-shadow);
    text-align: center;
  }

  h2 {
    color: var(--color-primary);
    text-align: center;
    border-bottom: 4px dotted;
  }

  p {
    font-size: clamp(12px, 4vw, 16px);
    margin-bottom: 0;
  }
`
