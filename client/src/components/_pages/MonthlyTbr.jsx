import { useState } from 'react'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
import styled from 'styled-components/macro'
import useQueryGet from '../../lib/hooks/useQueryGet'
import toggleStates from '../../lib/toggleStates'
import saveBookToPrompt from '../../services/saveBookToPrompt'
import saveBookToRound from '../../services/saveBookToRound'
import saveMarkedReadToBook from '../../services/saveMarkedReadToBook'
import savePromptToBook from '../../services/savePromptToBook'
import saveRoundToBook from '../../services/saveRoundToBook'
import BookCard from '../Books/BookCard'

export default function MonthlyTbr({ history, setHistory }) {
  const [isShowingDescription, setIsShowingDescription] = useState([])
  const [isShowingPrompts, setIsShowingPrompts] = useState([])

  const {
    data: booksData,
    error: booksError,
    isLoading: booksLoading,
    refetch: booksRefetch,
  } = useQueryGet('api/rounds', 'currentTBR')

  const { data: promptsData, refetch: promptsRefetch } = useQueryGet(
    'api/prompts',
    'prompts'
  )

  return (
    <PageWrapper>
      <h2>This Month's TBR</h2>
      {booksLoading && 'Your monthly TBR is being prepared...'}
      {booksError && (
        <p>
          Oh no! There was an error loading your data. <br />
          Please make sure you have chosen books for this month from your{' '}
          <a href="/tbr">main&nbsp;TBR</a>.
        </p>
      )}
      {booksData && booksData[0].books.length === 0 && (
        <p>
          Quite empty here... There are no books on your monthly TBR. You can
          choose some from your <a href="/tbr">main&nbsp;TBR</a>.
        </p>
      )}
      {booksData &&
        booksData[0].books
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
            }) => {
              return (
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
                  }}
                />
              )
            }
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
    booksRefetch()
  }

  function onChoosePrompt(prompt, bookID) {
    const addedPrompt = { _id: prompt._id }
    const addedBook = { _id: bookID }
    savePromptToBook(bookID, { $set: { prompt: addedPrompt } })
    saveBookToPrompt(prompt._id, { $set: { book: addedBook } })
    toggleStates(bookID, isShowingPrompts, setIsShowingPrompts)
    promptsRefetch()
    booksRefetch()
  }

  function onPromptClick(prompt, bookID) {
    savePromptToBook(bookID, { $unset: { prompt: 1 } })
    saveBookToPrompt(prompt._id, { $unset: { book: 1 } })
    promptsRefetch()
    booksRefetch()
  }

  function onDeleteBook(_id) {
    const deletedRound = { $unset: { round: 1 } }
    const deletedBook = { $pull: { books: _id } }
    saveRoundToBook(_id, deletedRound)
    saveBookToRound(deletedBook)
    booksRefetch()
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
