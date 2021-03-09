import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'

it('renders the Prompt component', () => {
  render(<App />)
  expect(screen.getByText(/prompt/i)).toBeVisible()
})

it('Text changes on button click -> the word "prompt" from the initial state is no longer displayed', () => {
  render(<App />)
  fireEvent.click(screen.getByText(/Spin!/i))
  expect(screen.queryByText(/prompt/i)).toBeNull()
})
