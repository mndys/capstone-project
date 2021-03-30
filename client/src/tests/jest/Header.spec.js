import { render, screen } from '@testing-library/react'
import Header from '../../components/Header'

it('renders the Header', () => {
  render(<Header>Wheel of TBR</Header>)
  expect(screen.getByRole('banner')).toBeVisible()
})

it('renders the Header with textContent as h1 element', () => {
  render(<Header>Wheel of TBR</Header>)
  expect(screen.getByRole('heading', { level: 1 })).toBeVisible()
})

it('renders the Header with the right font', () => {
  render(<Header>Wheel of TBR</Header>)
  expect(screen.getByRole('heading', { level: 1 })).toHaveStyle(
    "font-family: 'Hanging Letters'"
  )
})
