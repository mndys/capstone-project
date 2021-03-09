import styled from 'styled-components/macro'
import afterHeader from '../images/wavesOpacity.svg'

export default function Header({ children }) {
  return (
    <HeaderStyled>
      <Title>{children}</Title>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  align-content: top;
  background: linear-gradient(#0f6f7b 0%, #093a40 100%);

  ::after {
    content: url(${afterHeader});
    position: absolute;
    top: 100%;
    width: 100%;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: min(max(5vw, 40px), 60px);
  font-family: 'Hanging Letters';
  font-weight: normal;
  letter-spacing: 0.15em;
  color: #e4e4e4;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.84);
`
