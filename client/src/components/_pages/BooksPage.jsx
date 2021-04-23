import { useState } from 'react'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
import styled from 'styled-components/macro'
import del from '../../images/delete.svg'
import useQueryGet from '../../lib/hooks/useQueryGet'
import toggleStates from '../../lib/toggleStates'
import deleteBook from '../../services/deleteBook'
import saveBookToPrompt from '../../services/saveBookToPrompt'
import saveBookToRound from '../../services/saveBookToRound'
import savePromptToBook from '../../services/savePromptToBook'
import BookCard from '../Books/BookCard'

export default function BooksPage() {
  const [isShowingDescription, setIsShowingDescription] = useState([])
  const [isShowingPrompts, setIsShowingPrompts] = useState([])

  const { data, error, isLoading, refetch } = useQueryGet(
    'api/books',
    'mainTBR'
  )
  const { data: promptsData, refetch: promptsRefetch } = useQueryGet(
    'api/prompts',
    'prompts'
  )

  return (
    <PageWrapper>
      <h2>Books on your TBR</h2>
      {isLoading && 'Your TBR is being prepared...'}
      {error && (
        <p>
          Oh no! There was an error loading your data. <br />
          Please make sure you <a href="/add">add books</a> to your TBR.
        </p>
      )}
      {data &&
        data
          .sort(function (a, b) {
            if (a.read && !b.read) {
              return 1
            }
            if (!a.read && b.read) return -1
            return a.createdAt < b.createdAt
          })
          .map(
            ({
              _id,
              cover,
              title,
              author,
              publishedDate,
              genre,
              pageCount,
              rating,
              isbn,
              description,
              prompt,
              read,
            }) => (
              <BookCard
                key={_id}
                handleButton3={updateBook}
                button3Text={read ? 'remove' : 'to TBR'}
                {...{
                  _id,
                  cover,
                  title,
                  author,
                  publishedDate,
                  genre,
                  pageCount,
                  rating,
                  isbn,
                  description,
                  prompt,
                  read,
                  onPromptClick,
                  isShowingDescription,
                  setIsShowingDescription,
                  isShowingPrompts,
                  setIsShowingPrompts,
                  promptsData,
                  onChoosePrompt,
                  onDeleteBook,
                }}
              />
              // <Container key={_id}>
              //   <img
              //     src={del}
              //     alt="delete"
              //     className="del"
              //     onClick={() => onDeleteBook(_id)}
              //   />
              //   <div
              //     className="now"
              //     onClick={event => {
              //       updateBook(_id)
              //       refetch()
              //       event.target.classList.add('added')
              //     }}
              //   >
              //      ✓
              //   </div>
              //   <Card>
              //     <img src={cover} alt="" />
              //     <h3>{title}</h3>
              //     {author && (
              //       <span>
              //         by <em>{author} </em>
              //         {publishedDate ? `(${parseInt(publishedDate)})` : ''}
              //       </span>
              //     )}
              //     {genre && (
              //       <span>
              //         <strong>Genre:</strong> {genre.join(', ')}
              //       </span>
              //     )}
              //     {pageCount && (
              //       <span>
              //         <strong>Page Count:</strong> {pageCount}
              //       </span>
              //     )}
              //     {rating && (
              //       <span>
              //         <strong>Rating:</strong> {rating} ⭐️
              //       </span>
              //     )}
              //     {isbn && (
              //       <span>
              //         <strong>ISBN:</strong> {isbn}
              //       </span>
              //     )}
              //     {description ? (
              //       <details>
              //         <summary>
              //           <strong>Description:</strong>
              //         </summary>
              //         {description}
              //       </details>
              //     ) : (
              //       ''
              //     )}
              //   </Card>
              // </Container>
            )
          )}
      <ReactQueryDevtoolsPanel />
    </PageWrapper>
  )

  function onDeleteBook(_id) {
    deleteBook(_id)
    refetch()
  }

  function updateBook(id) {
    const newBook = { _id: id }
    console.log('new Book:', newBook)
    saveBookToRound(newBook)
  }

  function onChoosePrompt(prompt, bookID) {
    const addedPrompt = { _id: prompt._id }
    const addedBook = { _id: bookID }
    savePromptToBook(bookID, { $set: { prompt: addedPrompt } })
    saveBookToPrompt(prompt._id, { $set: { book: addedBook } })
    toggleStates(bookID, isShowingPrompts, setIsShowingPrompts)
    promptsRefetch()
    refetch()
  }

  function onPromptClick(prompt, bookID) {
    savePromptToBook(bookID, { $unset: { prompt: 1 } })
    saveBookToPrompt(prompt._id, { $unset: { book: 1 } })
    promptsRefetch()
    refetch()
  }
}

const PageWrapper = styled.section`
  position: relative;
  padding: clamp(30px, 10%, 100px) clamp(15px, 5%, 50px);
  display: grid;
  row-gap: 25px;
  h2 {
    padding: 0;
  }
`

const Container = styled.section`
  position: relative;
  background: linear-gradient(#fff 0%, var(--color-platinum) 100%);
  width: clamp(200px, 80vw, 730px);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 2px 6px 0px var(--color-shadow);
  font-size: 14px;

  .del {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 1.5rem;
    text-align: right;
    font-size: 30px;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .now {
    position: absolute;
    bottom: 5px;
    right: 12px;
    text-align: right;
    font-size: 30px;
    color: #333;
    padding: 0;
    margin: 0;
    cursor: pointer;
  }

  .added {
    color: var(--color-primary);
  }

  h3 {
    margin: 0;
    padding: 0;
    text-transform: none;
    letter-spacing: normal;
  }
`

const Card = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: min-content;
  column-gap: 20px;
  justify-content: center;
  padding-top: 20px;

  img {
    grid-row: 1 / 7;
    align-self: center;
    width: 50px;
  }
  details {
    padding-top: 1em;
    grid-column: 1 / 3;
  }
`
