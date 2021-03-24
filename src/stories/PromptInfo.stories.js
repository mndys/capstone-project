import React from 'react'
import PromptInfo from '../components/PromptInfo'

export default {
  title: 'ui/PromptInfo',
  component: PromptInfo,
  argTypes: {
    onClick: { action: 'clicked' },
  },
}

const Template = args => (
  <PromptInfo {...args} colorObject={{ name: 'name', hex: '#000000' }} />
)

export const Default = Template.bind({})
Default.args = {
  triggerPrompt: 'Clicked Prompt',
  prompts: [
    {
      option: 'Clicked Prompt',
      info: 'Receive further information about the clicked prompt',
    },
  ],
  calculateCurrentPromptNumber: 0,
}
