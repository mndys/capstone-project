import React from 'react'
import PromptInfo from '../components/Wheel/PromptInfo'

export default {
  title: 'ui/PromptInfo',
  component: PromptInfo,
  argTypes: {
    onClick: { action: 'clicked' },
  },
}

const Template = args => (
  <PromptInfo
    {...args}
    colorObject={{
      name: 'Japanese Carmine',
      hex: '#9D2933',
    }}
  />
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

export const ColorPrompt = Template.bind({})
ColorPrompt.args = {
  triggerPrompt: 'Cover Colour',
  prompts: [
    {
      option: 'Cover Colour',
      info:
        'Read a book with this colour on the cover, spine, or in the title:',
    },
  ],
  calculateCurrentPromptNumber: 0,
}
