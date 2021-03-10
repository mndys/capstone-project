import { fireEvent, render, screen } from '@testing-library/react'
import App from './App'
import Button from './Button'

it('renders a Button', () => {
  render(<Button />)
  expect(screen.getByRole('button')).toBeVisible()
})

it('renders a Button with textContent "Spin!"', () => {
  render(<App />)
  expect(screen.getByText('Spin!')).toBeVisible()
})

it('renders a grey gradient Button if Button is disabled', () => {
  render(<Button disabled>This is a button</Button>)
  expect(screen.getByRole('button')).toHaveStyle(
    'background: linear-gradient(#e5e5e5 0%, #c3c3c3 100%)'
  )
})

it('renders a green gradient Button if Button has attribute primary', () => {
  render(<Button primary>This is a button</Button>)
  expect(screen.getByRole('button')).toHaveStyle(
    'background: linear-gradient(#0f6f7b 0%, #093a40 100%)'
  )
})

it('calls onClick prop when clicked', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Spin!</Button>)
  fireEvent.click(screen.getByText('Spin!'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
