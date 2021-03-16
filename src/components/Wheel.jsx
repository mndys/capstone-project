import { Wheel } from 'react-custom-roulette'
import styled from 'styled-components/macro'
import prompts from '../data/wheel-prompts.json'

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

  const textColors = ['#0e1516']
  const outerBorderColor = '#e4e4e4'
  const outerBorderWidth = 10
  const innerBorderColor = '#fff'
  const innerBorderWidth = 60
  const innerRadius = 0
  const radiusLineColor = '#fff'
  const radiusLineWidth = 5
  const fontSize = 12
  const fontFamily = 'Hanging Letters'
  const textDistance = 63

  const calculatePrizeNumber = prompts.findIndex(
    prompt => prompt.option === winner
  )

  return (
    <Wrapper>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={calculatePrizeNumber}
        data={prompts}
        backgroundColors={backgroundColors}
        textColors={textColors}
        fontSize={fontSize}
        fontFamily={fontFamily}
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
  rotate: -47deg;
  max-width: 445px;
  justify-self: center;
`
