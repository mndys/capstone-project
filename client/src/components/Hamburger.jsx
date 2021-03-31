import styled from 'styled-components/macro'

export default function Hamburger({ active, onClick }) {
  return (
    <Bun onClick={onClick} className={active ? 'active' : ''}>
      <span className=""></span>
      <span className=""></span>
      <span className=""></span>
    </Bun>
  )
}

const Bun = styled.div`
  position: fixed;
  right: 20px;
  bottom: 2rem;
  width: 2rem;
  height: 21px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

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
    background-color: #093a40;
    border-radius: 9px;
  }
`
