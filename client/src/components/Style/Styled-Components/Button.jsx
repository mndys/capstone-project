import styled from 'styled-components/macro'

const Button = styled.button`
  width: fit-content;
  height: fit-content;
  align-content: top;
  ${props =>
    props.disabled
      ? 'background: linear-gradient(#e5e5e5 0%, var(--color-silver) 100%)'
      : props.primary
      ? 'background: linear-gradient(var(--color-primary) 0%, var(--color-primary-dark) 100%)'
      : ''};
  color: #fff;
  padding: 10px 20px;
  text-transform: uppercase;
  margin: 1em 0.1em;
  border-radius: 25px;
  cursor: ${props => (props.disabled ? 'default' : 'pointer')};
`

export default Button
