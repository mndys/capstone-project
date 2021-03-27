import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../components/App'

function clickSpin() {
  userEvent.click(screen.getByRole('button', { name: /spin/i }))
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
  it('writes to localStorage once on spin button click', () => {
    jest.spyOn(Object.getPrototypeOf(window.localStorage), 'setItem')
    render(<App />)
    clickSpin()
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
    render(<App />)

    expect(screen.queryByTestId('loadingCircles')).not.toBeInTheDocument()

    clickSpin()

    expect(screen.getByTestId('loadingCircles')).toBeVisible()
  })
})

describe('PromptInfo (Modal)', () => {
  jest.setTimeout(15000)
  it('Prompts can be clicked and display a modal with more information', done => {
    render(<App />)
    expect(screen.queryByTestId('PromptInfo')).not.toBeInTheDocument()
    clickSpin()
    setTimeout(() => clickPrompt(), 14000)
    expect(screen.getByTestId('PromptInfo')).toBeInTheDocument()
    done()
  })

  it('History items can be clicked and display a modal with more information', () => {
    render(<App />)
    expect(screen.queryByTestId('PromptInfo')).not.toBeInTheDocument()
    clickHistoryEntry()
    expect(screen.getByTestId('PromptInfo')).toBeInTheDocument()
  })

  it.todo('Loading Circles cannot be clicked')

  it.todo('Initial prompt cannot be clicked')

  it.todo('Last prompt cannot be clicked')
})
