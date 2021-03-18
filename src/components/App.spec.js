import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('App', () => {
  it('renders the App grid', () => {
    render(<App />)
    expect(screen.getByRole('banner').closest('div')).toHaveStyle(
      'display: grid'
    )
  })
})

describe('Buttons', () => {
  it('renders a Button with textContent "Spin!"', () => {
    render(<App />)
    expect(screen.getByRole('button', { name: 'Spin!' })).toBeVisible()
  })
})

describe('Local Storage', () => {
  it('writes to localStorage once on spin button click', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /spin/i }))
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(1)
  })

  it('writes to localStorage twice on reset button click', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /reset/i }))
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(2)
  })

  it('gets currentProperty and promptHistory from localStorage on load', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
    render(<App />)
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(2)
  })
})

describe('Wheel', () => {
  it('starts spinning the wheel on spin button click', () => {
    const SPINNING_PROMPT = '...'
    render(<App />)
    userEvent.click(screen.getByRole('button', { name: /spin/i }))
    expect(screen.getByTestId('prompt').textContent).toBe(SPINNING_PROMPT)
  })
})
