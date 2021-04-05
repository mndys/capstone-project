import axios from 'axios'
import { useQuery } from 'react-query'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
import styled from 'styled-components/macro'
import deleteBook from '../../services/deleteBook'
import saveBookToRound from '../../services/saveBookToRound'

export default function BooksPage() {
  const fetchBooks = async () => {
    const { data } = await axios.get('api/books')
    return data
  }

  const { status, data, refetch } = useQuery('yourTBR', fetchBooks, {
    refetchOnWindowFocus: false,
  })

  return (
    <PageWrapper>
      <h2>Books on your TBR</h2>
      {status === 'success' &&
        data.reverse().map(book => (
          <Container key={book._id}>
            <div
              className="x"
              onClick={() => {
                deleteBook(book._id)
                refetch()
              }}
            >
              ✖️
            </div>
            <div
              className="now"
              onClick={event => {
                updateBook(book._id)
                refetch()
                event.target.classList.add('added')
              }}
            >
               ✓
            </div>
            <Card>
              <img src={book.cover} alt="" />
              <h3>{book.title}</h3>
              {book.author && (
                <span>
                  by <em>{book.author} </em>
                  {book.publishedDate
                    ? `(${parseInt(book.publishedDate)})`
                    : ''}
                </span>
              )}
              {book.genre && (
                <span>
                  <strong>Genre:</strong> {book.genre.join(', ')}
                </span>
              )}
              {book.pageCount && (
                <span>
                  <strong>Page Count:</strong> {book.pageCount}
                </span>
              )}
              {book.rating && (
                <span>
                  <strong>Rating:</strong> {book.rating} ⭐️
                </span>
              )}
              {book.isbn && (
                <span>
                  <strong>ISBN:</strong> {book.isbn}
                </span>
              )}
              {book.description ? (
                <details>
                  <summary>
                    <strong>Description:</strong>
                  </summary>
                  {book.description}
                </details>
              ) : (
                ''
              )}
            </Card>
          </Container>
        ))}
      <ReactQueryDevtoolsPanel />
    </PageWrapper>
  )

  function updateBook(id) {
    const newBook = {
      month: Date.now(),
      book: id,
    }
    saveBookToRound(newBook)
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

  .x {
    position: absolute;
    top: 5px;
    right: 10px;
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
