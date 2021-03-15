import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

it('renders the App grid', () => {
  render(<App />)
  expect(screen.getByRole('banner').closest('div')).toHaveStyle('display: grid')
})

it('renders a Button with textContent "Spin!"', () => {
  render(<App />)
  expect(screen.getByRole('button', { name: 'Spin!' })).toBeVisible()
})

it('writes to localStorage once on spin button click', () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
  render(<App />)
  userEvent.click(screen.getByRole('button', { name: /spin!/i }))
  expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
})

it('writes to localStorage twice on reset button click', () => {
  jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
  render(<App />)
  userEvent.click(screen.getByRole('button', { name: /reset/i }))
  expect(window.localStorage.setItem).toHaveBeenCalledTimes(2)
})

it('gets currentProperty and promptHistory from localStorage on reload', () => {
  jest.spyOn(window.localStorage.__proto__, 'getItem')
  render(<App />)
  window.location.reload()
  expect(window.localStorage.getItem).toHaveBeenCalledTimes(2)
})
