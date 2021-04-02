import styled from 'styled-components/macro'

export default function Hamburger({ active, toggleActive, showPromptInfo }) {
  return (
    <Bun
      onClick={toggleActive}
      className={active ? 'active' : ''}
      showPromptInfo={showPromptInfo}
    >
      <span></span>
      <span></span>
      <span></span>
    </Bun>
  )
}

const Bun = styled.div`
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 2rem;
  height: 21px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  ${props => props.showPromptInfo && 'filter: blur(2px); z-index: -1'};

  span:nth-of-type(1) {
    top: 0px;
    transition: top 0.3s ease 0.3s, transform 0.3s ease-out 0.1s;
  }
  span:nth-of-type(2) {
    top: 9px;
    transition: ease 0.3s 0.3s;
  }
  span:nth-of-type(3) {
    top: 18px;
    transition: top 0.3s ease 0.3s, transform 0.3s ease-out 0.1s;
  }

  &.active span:nth-of-type(1) {
    top: 9px;
    transform: rotate(45deg);
    transition: top 0.3s ease 0.1s, transform 0.3s ease-out 0.5s;
  }
  &.active span:nth-of-type(2) {
    opacity: 0;
  }
  &.active span:nth-of-type(3) {
    top: 9px;
    transform: rotate(-45deg);
    transition: top 0.3s ease 0.1s, transform 0.3s ease-out 0.5s;
  }

  span {
    height: 4px;
    width: 30px;
    display: block;
    position: absolute;
    background-color: var(--color-primary-dark);
    border-radius: 9px;
  }
`
