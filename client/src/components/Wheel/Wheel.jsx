import { Wheel } from 'react-custom-roulette'
import styled from 'styled-components/macro'
import prompts from '../../data/prompts.json'
import ff from '../../images/fast-forward.svg'

export default function WheelComponent({ winner, mustSpin, setMustSpin }) {
  const backgroundColors = [
    '#f94144',
    '#f3722c',
    '#f8961e',
    '#f9c74f',
    '#90be6d',
    '#43aa8b',
    '#577590',
  ]

  const textColors = ['#0e1516ff']
  const outerBorderColor = '#e4e4e4ff'
  const outerBorderWidth = 10
  const innerBorderColor = '#fff'
  const innerBorderWidth = 60
  const innerRadius = 0
  const radiusLineColor = '#fff'
  const radiusLineWidth = 5
  const fontSize = 12
  const textDistance = 63

  const calculatePrizeNumber = prompts.findIndex(
    prompt => prompt.option === winner
  )

  return (
    <Wrapper>
      {mustSpin && (
        <img
          id="ff"
          src={ff}
          alt="fast forward animation"
          onClick={() => window.location.reload()}
        />
      )}
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={calculatePrizeNumber}
        data={prompts}
        backgroundColors={backgroundColors}
        textColors={textColors}
        fontSize={fontSize}
        outerBorderColor={outerBorderColor}
        outerBorderWidth={outerBorderWidth}
        innerRadius={innerRadius}
        innerBorderColor={innerBorderColor}
        innerBorderWidth={innerBorderWidth}
        radiusLineColor={radiusLineColor}
        radiusLineWidth={radiusLineWidth}
        // perpendicularText
        textDistance={textDistance}
        onStopSpinning={() => {
          setMustSpin(false)
        }}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  max-width: 445px;
  justify-self: center;

  #ff {
    position: absolute;
    top: 50%;
    left: 50.5%;
    width: 20px;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 999;
  }
`
