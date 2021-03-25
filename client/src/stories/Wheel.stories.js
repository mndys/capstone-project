import React from 'react'
import { Wheel } from 'react-custom-roulette'

export default {
  title: 'ui/Wheel',
  component: Wheel,
  argTypes: {},
}

const Template = args => (
  <Wheel
    {...args}
    textColors={['#0e1516']}
    fontSize="20"
    outerBorderColor="#e4e4e4"
    outerBorderWidth="10"
    innerRadius="0"
    innerBorderColor="#fff"
    innerBorderWidth="60"
    radiusLineColor="#fff"
    radiusLineWidth="5"
    // perpendicularText
    textDistance="63"
    mustStartSpinning
  />
)

export const Default = Template.bind({})
Default.args = {
  prizeNumber: 0,
  data: [
    { option: 'change' },
    { option: 'prize' },
    { option: 'number' },
    { option: 'to' },
    { option: 'spin' },
    { option: 'the' },
    { option: 'wheel' },
  ],
  backgroundColors: [
    '#f94144',
    '#f3722c',
    '#f8961e',
    '#f9c74f',
    '#90be6d',
    '#43aa8b',
    '#577590',
  ],
}
