import styled from 'styled-components/macro'

export default function PromptSpecifier({
  colorObject,
  triggerPrompt,
  randomPageNumber,
}) {
  return (
    <Wrapper colorObject={colorObject}>
      {triggerPrompt !== 'Page Number' ? (
        <>
          <ColorCircle colorObject={colorObject} />
          {colorObject.name}
        </>
      ) : (
        ''
      )}
      {triggerPrompt === 'Page Number' ? (
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
  gap: 10px;
  text-align: center;
  font-size: 18px;
  width: clamp(50px, 60vw, 800px);
`
const ColorCircle = styled.div`
  background-color: ${props => props.colorObject.hex};
  border-radius: 5px;
  display: inline-block;
  box-shadow: 1px 1px 2px #33333380;
  width: 20px;
  height: 20px;
`
