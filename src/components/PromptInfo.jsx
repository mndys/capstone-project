import styled from 'styled-components/macro'

export default function PromptInfo({
  triggerPrompt,
  onClick,
  prompts,
  colorObject,
}) {
  return (
    <Modal onClick={onClick} data-testid="promptInfo" colorObject={colorObject}>
      <div>
        <h2>{triggerPrompt}</h2>
        <p>
          {prompts[calculateCurrentPromptNumber()].info}
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
        </p>
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
  width: 100%;
  height: 100%;

  & > div {
    background: linear-gradient(#fff 0%, #e4e4e4 100%);
    width: clamp(200px, 80vw, 500px);
    padding: 20px;
    border-radius: 5px;
    box-shadow: 1px 2px 6px 0px #333a;
    text-align: center;
  }

  p > div {
    text-align: center;

    :last-child {
      margin: 0.3em auto;
      width: 80%;
      height: 2em;
      background: ${props => props.colorObject.hex};
    }
  }

  h2 {
    color: #0f6f7b;
    text-align: center;
    border-bottom: 4px dotted;
  }

  p {
    font-size: clamp(12px, 4vw, 24px);
  }
`
