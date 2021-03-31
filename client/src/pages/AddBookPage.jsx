import styled from 'styled-components/macro'

export default function AddBookPage() {
  return (
    <AddBook>
      <h2>Add Book to TBR</h2>
      <Form>
        <label>
          Title:
          <input />
        </label>
        <label>
          Author:
          <input />
        </label>
        <label>
          Date Published:
          <input />
        </label>
        <label>
          Description:
          <input />
        </label>
        <label>
          Page Count:
          <input />
        </label>
        <label>
          ISBN:
          <input />
        </label>
        <label>
          Rating:
          <input />
        </label>
      </Form>
    </AddBook>
  )
}
const AddBook = styled.section`
  h2 {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
`
const Form = styled.form``
