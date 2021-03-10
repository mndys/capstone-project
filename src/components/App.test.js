import { render, screen } from '@testing-library/react'
import App from './App'

it('renders the App grid', () => {
  render(<App />)
  expect(screen.getByRole('banner').closest('div')).toHaveStyle('display: grid')
})

it('renders a Button with textContent "Spin!"', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: 'Spin!' })).toBeVisible()
})
