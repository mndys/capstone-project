import { useState } from 'react'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
import styled from 'styled-components/macro'
import useQueryGet from '../../lib/hooks/useQueryGet'
import toggleStates from '../../lib/toggleStates'
import deleteBook from '../../services/deleteBook'
import saveBookToPrompt from '../../services/saveBookToPrompt'
import saveBookToRound from '../../services/saveBookToRound'
import saveMarkedReadToBook from '../../services/saveMarkedReadToBook'
import savePromptToBook from '../../services/savePromptToBook'
import saveRoundToBook from '../../services/saveRoundToBook'
import BookCard from '../Books/BookCard'

export default function BooksPage({ history, setHistory }) {
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
      {data && data.length === 0 && (
        <p>
          Quite empty here... There are no books on your TBR yet. <br />
          You can <a href="/add">add books</a> to display here.
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
          .filter(book => !book.round)
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
                  onMarkedRead,
                  onBookToTBR,
                }}
              />
            )
          )}
      <ReactQueryDevtoolsPanel />
    </PageWrapper>
  )

  function onMarkedRead(_id, read, prompt) {
    saveMarkedReadToBook(_id, read)
    let newHistory = history
    if (prompt && history.includes(prompt.option)) {
      newHistory.splice(
        history.findIndex(entry => entry === `${prompt.option}`),
        1,
        prompt.option + ' ✔️'
      )
    } else if (prompt && history.includes(`${prompt.option} ✔️`)) {
      newHistory.splice(
        history.findIndex(entry => entry === `${prompt.option} ✔️`),
        1,
        prompt.option
      )
    }
    setHistory(newHistory)
    refetch()
  }

  function onDeleteBook(_id) {
    deleteBook(_id)
    refetch()
  }

  function onBookToTBR(_id) {
    const newBook = { $push: { books: { _id: _id } } }
    const newRound = { $set: { round: '607b5d3eb561230d8e1f39fd' } }
    saveBookToRound(newBook)
    saveRoundToBook(_id, newRound)
    refetch()
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
