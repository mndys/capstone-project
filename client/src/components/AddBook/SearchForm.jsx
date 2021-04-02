import styled from 'styled-components/macro'
import Button from '../Style/Styled-Components/Button'
import Input, { Label } from '../Sitewide/Input'
import { GridWrapper } from './AddBookForm'

export default function SearchForm({ handleSubmit }) {
  return (
    <Input
      type="search"
      name="search"
      className="big-label"
      placeholder="type your search terms like Title, Author, or both"
      required
      autoFocus
      autoComplete="off"
    >
      Search Google Books:
    </Input>
  )
}

const ButtonWrapper = styled(GridWrapper)`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  gap: 20px;
`
const InputWrapper = styled(GridWrapper)`
  grid-template-columns: 1fr 1fr;
  justify-content: left;
  gap: 20px;
`
