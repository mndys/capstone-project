import styled from 'styled-components/macro'
import Button from './Button'
import Input, { Label } from './Input'
import { GridWrapper } from './AddBookForm'

export default function SearchForm({ handleSubmit }) {
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Input
        name="search"
        className="big-label"
        placeholder="Title, Author, or both"
        required
        autoFocus
      >
        Search Google Books:
      </Input>
      <ButtonWrapper>
        <Button type="submit" primary>
          Search!{' '}
        </Button>
      </ButtonWrapper>
    </form>
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
