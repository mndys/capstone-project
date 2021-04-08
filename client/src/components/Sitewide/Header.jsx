import styled from 'styled-components/macro'
import afterHeader from '../../images/wavesOpacity.svg'

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
  background: linear-gradient(
    var(--color-primary) 0%,
    var(--color-primary-dark) 100%
  );

  ::after {
    content: url(${afterHeader});
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 9999;
  }
`

const Title = styled.h1`
  margin: 0;
  font-size: clamp(46px, 5vh, 60px);
  font-family: 'Hanging Letters';
  font-weight: normal;
  letter-spacing: 0.15em;
  color: var(--color-platinum);
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.84);
`
