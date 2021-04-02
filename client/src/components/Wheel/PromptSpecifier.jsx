import styled from 'styled-components/macro'

export default function PromptSpecifier({
  colorObject,
  randomPageNumber,
  currentPrompt,
}) {
  return (
    <Wrapper colorObject={colorObject}>
      {currentPrompt === 'Cover Colour' ? (
        <>
          <ColorCircle colorObject={colorObject} />
          {colorObject.name}
        </>
      ) : (
        ''
      )}
      {currentPrompt === 'Page Number' ? (
        <strong>{randomPageNumber}</strong>
      ) : (
        ''
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  width: clamp(50px, 60vw, 800px);
`
const ColorCircle = styled.div`
  background-color: ${props => props.colorObject.hex};
  border-radius: 5px;
  display: inline-block;
  box-shadow: 1px 1px 2px var(--color-shadow);
  width: 20px;
  height: 20px;
`
