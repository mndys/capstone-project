import { useState } from 'react'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
import styled from 'styled-components/macro'
import useQueryGet from '../../lib/hooks/useQueryGet'
import toggleStates from '../../lib/toggleStates'
import saveBookToPrompt from '../../services/saveBookToPrompt'
import saveMarkedReadToBook from '../../services/saveMarkedReadToBook'
import savePromptToBook from '../../services/savePromptToBook'
import SmallButton from '../Style/Styled-Components/SmallButton'
import del from '../../images/delete.svg'

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
          <a href="/tbr">main TBR</a>.
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
                <Container key={_id} id={_id} className={read && 'read'}>
                  <Card>
                    <img src={cover} alt="" />
                    <h3>{title}</h3>
                    {author && (
                      <span>
                        by <em>{author} </em>
                        {publishedDate ? `(${parseInt(publishedDate)})` : ''}
                      </span>
                    )}
                    {genre && (
                      <span>
                        <strong>Genre:</strong> {genre.join(', ')}
                      </span>
                    )}
                    {pageCount && (
                      <span>
                        <strong>Page Count:</strong> {pageCount}
                      </span>
                    )}
                    {rating && (
                      <span>
                        <strong>Rating:</strong> {rating} ⭐️
                      </span>
                    )}
                    {isbn && (
                      <span>
                        <strong>ISBN:</strong> {isbn}
                      </span>
                    )}
                    {prompt && (
                      <span
                        className="prompt"
                        {...(!read
                          ? { onClick: () => onPromptClick(prompt, _id) }
                          : '')}
                      >
                        <strong>Prompt:</strong>
                        <img id="del" src={del} alt="delete" /> {prompt.option}
                      </span>
                    )}
                    <ButtonWrapper>
                      <SmallButton
                        onClick={() =>
                          toggleStates(
                            _id,
                            isShowingDescription,
                            setIsShowingDescription
                          )
                        }
                      >
                        {isShowingDescription.hasOwnProperty(_id)
                          ? 'less'
                          : 'more'}
                      </SmallButton>
                      <SmallButton
                        onClick={() =>
                          toggleStates(
                            _id,
                            isShowingPrompts,
                            setIsShowingPrompts
                          )
                        }
                        primary
                        disabled={read || prompt}
                      >
                        prompt
                      </SmallButton>
                      <SmallButton
                        onClick={() => onMarkedRead(_id, read, prompt)}
                      >
                        {read ? 'to read' : 'done'}
                      </SmallButton>
                    </ButtonWrapper>
                    {promptsData &&
                    isShowingPrompts.includes(_id) &&
                    promptsData.filter(prompt => !prompt.book).length === 0 ? (
                      <p>
                        Oh no! There are no prompts left.{' '}
                        <a href="/">Spin&nbsp;the&nbsp;wheel</a> to receive more
                        prompts or remove a prompt from another book to assign
                        it here.
                      </p>
                    ) : (
                      promptsData &&
                      isShowingPrompts.includes(_id) && (
                        <div className="choosePrompt">
                          {promptsData
                            .filter(prompt => !prompt.book)
                            .map((prompt, index) => (
                              <Entry
                                key={index}
                                onClick={() => onChoosePrompt(prompt, _id)}
                              >
                                {prompt.option}
                              </Entry>
                            ))}
                        </div>
                      )
                    )}
                    {description ? (
                      <>
                        <div className="description">
                          {isShowingDescription.includes(_id) && (
                            <>
                              <strong>Description: </strong>
                              {description}
                            </>
                          )}
                        </div>
                      </>
                    ) : (
                      ''
                    )}
                  </Card>
                </Container>
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

  &.read {
    opacity: 0.5;
  }

  h3 {
    margin: 0;
    padding: 0;
    text-transform: none;
    letter-spacing: normal;
  }

  .description {
    grid-column: 1 / 3;
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
    grid-row: 1 / 8;
    align-self: center;
    width: 50px;
  }

  .choosePrompt {
    grid-column: 1 / 3;
    justify-self: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin-top: 0.3rem;

    & > * {
      margin-right: 5px;
      margin-bottom: 5px;
      background: #0001;
    }
  }

  #del {
    width: 1rem;
    top: 1px;
  }
  .prompt {
    cursor: pointer;
  }

  p {
    grid-column: 1 / 3;
  }

  .prompt {
    display: flex;
    align-items: center;

    & > * {
      margin-right: 0.3em;
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  grid-column: 1 / 3;
`

const Entry = styled.div`
  padding: 5px 15px;
  border-radius: 5px;
  background: var(--color-platinum);
  :hover {
    cursor: pointer;
  }
`
