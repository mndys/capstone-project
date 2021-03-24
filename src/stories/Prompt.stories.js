import React from 'react'
import Prompt from '../components/Prompt'

export default {
  title: 'ui/Prompt',
  component: Prompt,
  argTypes: {},
}

const Template = args => <Prompt {...args}>{args.text}</Prompt>

export const Default = Template.bind({})
Default.args = {
  text: 'Go fish!',
}