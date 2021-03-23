import { render, screen } from '@testing-library/react'
import Prompt from './Prompt'

it('renders the Prompt component', () => {
  render(<Prompt />)
  expect(screen.getByTestId(/prompt/i)).toBeVisible()
})
