import { render, screen } from '@testing-library/react'
import PromptInfo from '../../components/Wheel/PromptInfo'

const triggerPrompt = 'Big Book'
const prompts = [
  {
    option: 'Big Book',
    info: 'Read a book which has more pages than most other books on your TBR',
  },
]
const onClick = jest.fn()
const colorObject = {
  name: 'Cardinal',
  hex: '#C41E3A',
}
const randomPageNumber = 333

it('renders the PromptInfo component', () => {
  render(
    <PromptInfo
      {...{ triggerPrompt, prompts, onClick, colorObject, randomPageNumber }}
    />
  )
  expect(screen.getByTestId('promptInfo')).toBeInTheDocument()
})
