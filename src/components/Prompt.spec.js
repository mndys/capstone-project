import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

it('renders the Prompt component', () => {
  render(<App />)
  expect(screen.getByTestId(/prompt/i)).toBeVisible()
})

it('Text changes on button click -> the word "prompt" from the initial state is no longer displayed', () => {
  render(<App />)
  userEvent.click(screen.getByText(/Spin!/i))
  expect(screen.queryByText(/prompt/i)).toBeNull()
})
