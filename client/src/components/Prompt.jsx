import styled from 'styled-components/macro'

const Prompt = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;
  font-size: 1.5em;
  align-items: center;
  justify-content: center;
  padding: 0 2em;
  height: 3em;

  :hover {
    cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  }
`

export default Prompt
