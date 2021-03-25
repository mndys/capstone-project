import React from 'react'
import Button from '../components/Button'

export default {
  title: 'ui/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
  },
}

const Template = args => <Button {...args}>{args.text}</Button>

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  text: 'I am a primary Button',
  disabled: false,
}

export const Secondary = Template.bind({})
Secondary.args = {
  text: 'I am a Button',
  primary: false,
  disabled: false,
}

export const Disabled = Template.bind({})
Disabled.args = {
  text: 'I am a disabled Button',
  primary: false,
  disabled: true,
}
