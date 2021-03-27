import { render, screen } from '@testing-library/react'
import Prompt from '../../components/Prompt'

it('renders the Prompt component', () => {
  render(<Prompt />)
  expect(screen.getByTestId(/prompt/i)).toBeVisible()
})
