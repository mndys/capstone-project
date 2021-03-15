import { useState } from 'react'
import { Wheel } from 'react-custom-roulette'
import styled from 'styled-components'
import prompts from '../data/wheel-prompts.json'

export default function WheelComponent({ winner, onSpin, LASTPROMPT }) {
  /* const calculatePrizeNumber = prompts.findIndex(
    prompt => prompt.option === winner
  )
  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * prompts.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
    onSpin()
  }

  return (
    <>
      <Wheel
        mustStartSpinning={true}
        prizeNumber={calculatePrizeNumber}
        data={prompts}
        onStopSpinning={() => {
          setMustSpin(true)
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </>
  ) */

  const data = [
    { option: 'REACT' },
    { option: 'CUSTOM' },
    { option: 'ROULETTE', style: { textColor: '#f9dd50' } },
    { option: 'WHEEL' },
    { option: 'REACT' },
    { option: 'CUSTOM' },
    { option: 'ROULETTE', style: { textColor: '#70bbe0' } },
    { option: 'WHEEL' },
  ]

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
  const outerBorderColor = '#e3e3e3'
  const outerBorderWidth = 10
  const innerBorderColor = '#fff'
  const innerBorderWidth = 60
  const innerRadius = 0
  const radiusLineColor = '#fff'
  const radiusLineWidth = 5
  const fontSize = 12
  const textDistance = 63

  const [mustSpin, setMustSpin] = useState(false)
  const [prizeNumber, setPrizeNumber] = useState(0)

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length)
    setPrizeNumber(newPrizeNumber)
    setMustSpin(true)
  }

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
      <button className={'spin-button'} onClick={handleSpinClick}>
        SPIN
      </button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  left: 7%;
  rotate: -47deg;
  top: -16%;
`
