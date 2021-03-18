import React from 'react'
import History from './History'

export default {
  title: 'ui/History',
  component: History,
  argTypes: {},
}

const Template = args => <History {...args}></History>

export const Default = Template.bind({})
Default.args = {
  history: ['Spin 1', 'Spin 2', 'Spin 3', 'Spin 4', '...'],
}
