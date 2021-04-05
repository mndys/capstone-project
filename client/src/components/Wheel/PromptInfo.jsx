import styled from 'styled-components/macro'

export default function PromptInfo({
  triggerPrompt,
  onToggleShowPromptInfo,
  prompts,
  colorObject,
  randomPageNumber,
}) {
  return (
    <Modal
      data-testid="promptInfo"
      onClick={onToggleShowPromptInfo}
      {...{ colorObject }}
    >
      <div>
        <h2>{triggerPrompt}</h2>
        {triggerPrompt.match(/✔️/i) && (
          <p>Congratulations! You have completed this prompt.</p>
        )}
        {!triggerPrompt.match(/✔️/i) && (
          <p>{prompts[calculateCurrentPromptNumber()].info}</p>
        )}
        {triggerPrompt === 'Cover Colour' ? (
          <>
            <div>
              <strong>{colorObject.name}</strong>
            </div>
            <div></div>
          </>
        ) : (
          ''
        )}
        {triggerPrompt === 'Page Number' ? (
          <>
            <div>
              <strong>{randomPageNumber}</strong>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
    </Modal>
  )

  function calculateCurrentPromptNumber() {
    return prompts.findIndex(prompt => prompt.option === triggerPrompt)
  }
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

  div:nth-child(4) {
    margin: 0.2em auto;
    width: 80%;
    height: 2em;
    background: ${props => props.colorObject.hex};
  }

  h2 {
    color: var(--color-primary);
    text-align: center;
    border-bottom: 4px dotted;
  }

  p {
    font-size: clamp(12px, 4vw, 24px);
    margin-bottom: 0;
  }
`
