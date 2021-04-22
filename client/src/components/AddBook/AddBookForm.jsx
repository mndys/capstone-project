import styled from 'styled-components/macro'
import Button from '../Style/Styled-Components/Button'
import Input, { Label } from '../Sitewide/Input'

export default function AddBookForm({ handleSubmit }) {
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Input name="title" placeholder="Maus" required>
        Title:
      </Input>
      <Input name="author" placeholder="Art Spiegelman">
        Author:
      </Input>
      <Input
        name="genre"
        placeholder="Graphic Novel, Autobiography"
        title="Comma-separated List of matching genres"
      >
        Genre:
      </Input>
      <InputWrapper>
        <Input
          className="small-label"
          name="pageCount"
          type="number"
          min="1"
          max="9999"
          placeholder="295"
          title="Total Pages in whole numbers"
          pattern={/[0-9]{1,4}/}
        >
          Page Count:
        </Input>
        <Input
          className="small-label"
          name="rating"
          type="number"
          step="0.1"
          placeholder="4.5"
          min="1"
          max="5"
          pattern={/[1-5]\.?[0-9]?/g}
          title="1.0-5.0"
        >
          Rating:
        </Input>
      </InputWrapper>
      <InputWrapper>
        <Input className="small-label" name="publishedDate" type="date">
          Date Published:
        </Input>
        <Input
          className="small-label"
          name="isbn"
          type="number"
          min="9780000000000"
          max="9789999999999"
          placeholder="9780679406419"
          pattern={/978[1-9]{10}/}
          title={`13 digits, starting with "978..."`}
        >
          ISBN:
        </Input>
      </InputWrapper>
      <TextareaLabel className="big-label">
        Description:
        <textarea
          name="description"
          placeholder="You can write down your own notes here, or the synapsis."
          title="You can write down your own notes here, or the synapsis."
          rows="5"
          autoComplete="off"
        />
      </TextareaLabel>
      <GridWrapper>
        <Button type="submit" primary>
          Save!
        </Button>
        <Button type="reset" secondary>
          reset
        </Button>
      </GridWrapper>
    </form>
  )
}

const TextareaLabel = styled(Label)``

export const GridWrapper = styled.div`
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
