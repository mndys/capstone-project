import { render, screen } from '@testing-library/react'
import Header from './Header'

it('renders the Header', () => {
  render(<Header>Wheel of TBR</Header>)
  expect(screen.getByText('Wheel of TBR')).toBeVisible()
})
it.todo('renders the Header with the right font')
