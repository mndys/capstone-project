import styled from 'styled-components/macro'

export default function Color({ colorObject }) {
  return (
    <ColorName colorObject={colorObject}>
      <ColorCircle colorObject={colorObject} /> {colorObject.name}
    </ColorName>
  )
}

const ColorName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  font-size: 18px;
  width: clamp(50px, 60vw, 400px);
`
const ColorCircle = styled.div`
  background-color: ${props => props.colorObject.hex};
  border-radius: 5px;
  display: inline-block;
  box-shadow: 1px 1px 2px #33333380;
  width: 20px;
  height: 20px;
`
