import styled from 'styled-components/macro'

const Button = styled.button`
  width: fit-content;
  height: fit-content;
  align-content: top;
  ${props =>
    props.disabled
      ? 'background: linear-gradient(#e5e5e5 0%, #c3c3c3 100%)'
      : props.primary
      ? 'background: linear-gradient(#0f6f7b 0%, #093a40 100%)'
      : ''};
  color: #fff;
  padding: 10px 20px;
  text-transform: uppercase;
  margin: 1em 0.1em;
  border-radius: 25px;
`

export default Button
