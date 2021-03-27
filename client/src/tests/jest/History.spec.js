import { render, screen } from '@testing-library/react'
import History from '../../components/History'

it('renders a History div with previous prompts if there have been prompts before', () => {
  const history = ['Spin 1', 'Spin 2', 'Spin 3']
  render(history.length ? <History history={history} /> : '')
  expect(screen.getByTestId('history')).toBeInTheDocument()
})

it('does not render a History div without previous prompts', () => {
  const history = []
  render(history.length ? <History history={history} /> : '')
  expect(screen.queryByTestId('history')).not.toBeInTheDocument()
})
