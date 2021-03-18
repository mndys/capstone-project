import styled from 'styled-components/macro'

export default function LoadingCircles() {
  return (
    <Wrapper>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  top: 10px;
  gap: 15px;

  .circle {
    position: relative;
    border-radius: 50%;
    background: #000;
    width: 10px;
    height: 10px;
    animation: bounce 0.5s alternate infinite ease;
  }

  .circle:nth-child(2) {
    animation-delay: 0.2s;
  }

  .circle:nth-child(3) {
    animation-delay: 0.3s;
  }

  @keyframes bounce {
    0% {
      bottom: 0px;
    }
    100% {
      bottom: 15px;
    }
  }
`
