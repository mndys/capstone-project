import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '../../components/Style/Styled-Components/Button'

it('renders a Button', () => {
  render(<Button />)
  expect(screen.getByRole('button')).toBeVisible()
})

it('renders Buttons with the attributes "disabled" and "primary" differently from Buttons without or with different attributes', () => {
  const button = render(<Button>This is a button</Button>).container
  const disabledButton = render(<Button disabled>This is a button</Button>)
    .container
  const primaryButton = render(<Button primary>This is a button</Button>)
    .container
  const unknownAttrButton = render(<Button test>This is a button</Button>)
    .container
  expect(button).not.toEqual(disabledButton || primaryButton)
  expect(disabledButton).not.toEqual(button || primaryButton)
  expect(primaryButton).not.toEqual(disabledButton || button)
  expect(button).toEqual(unknownAttrButton)
})

it('calls onClick prop when clicked', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Spin!</Button>)
  userEvent.click(screen.getByText('Spin!'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
