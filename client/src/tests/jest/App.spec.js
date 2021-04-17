import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../components/App'

function clickSpin() {
  userEvent.click(screen.getByRole('button', { name: /spin/i }))
}
function clickReset() {
  userEvent.click(screen.getByRole('button', { name: /reset/i }))
}
function clickPrompt() {
  userEvent.click(screen.getByTestId('prompt'))
}
function clickHistory() {
  userEvent.click(screen.getByTestId('history'))
}
function clickHistoryEntry() {
  userEvent.click(screen.getByTestId('history'))
}

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
  it('writes to localStorage twice (for history and current prompt) on first spin button click', () => {
    render(<App />)
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    clickSpin()
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(2)
  })

  it('writes to localStorage 4 times on reset button click', () => {
    render(<App />)
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    clickReset()
    expect(window.localStorage.setItem).toHaveBeenCalledTimes(6)
    expect(window.localStorage.setItem).toHaveBeenCalledWith(
      'promptHistory',
      '[]'
    )
  })

  it('gets currentProperty and promptHistory from localStorage on load', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'getItem')
    render(<App />)
    expect(window.localStorage.getItem).toHaveBeenCalledTimes(4)
    expect(window.localStorage.getItem).toHaveBeenCalledWith('currentPrompt')
    expect(window.localStorage.getItem).toHaveBeenCalledWith('promptHistory')
    expect(window.localStorage.getItem).toHaveBeenCalledWith('colorObject')
    expect(window.localStorage.getItem).toHaveBeenCalledWith('randomPageNumber')
  })
})

// describe('Wheel', () => {
//   it('starts spinning the wheel on spin button click', () => {
//     render(<App />)

//     expect(screen.queryByTestId('loadingCircles')).not.toBeInTheDocument()

//     clickSpin()

//     expect(screen.getByTestId('loadingCircles')).toBeVisible()
//   })
// })

it.todo('Loading Circles cannot be clicked')

it.todo('Initial prompt cannot be clicked')

it.todo('Last prompt cannot be clicked')
