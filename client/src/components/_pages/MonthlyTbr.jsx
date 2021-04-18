import { useState } from 'react'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
import styled from 'styled-components/macro'
import useQueryGet from '../../lib/hooks/useQueryGet'
import savePromptToBook from '../../services/savePromptToBook'
import SmallButton from '../Style/Styled-Components/SmallButton'

export default function MonthlyTbr({ history, setHistory }) {
  const [isShowingDescription, setIsShowingDescription] = useState({
    '6076073e04ec6bb0879a2e81': true,
  })
  const [isDone, setIsDone] = useState({
    '6076073e04ec6bb0879a2e81': true,
  })
  const [isShowingPrompts, setIsShowingPrompts] = useState([])

  const {
    data: booksData,
    error: booksError,
    isLoading: booksLoading,
    refetch: booksRefetch,
  } = useQueryGet('api/rounds', 'currentTBR')

  const {
    data: promptsData,
    error: promptsError,
    isLoading: promptsLoading,
    refetch: promptsRefetch,
  } = useQueryGet('api/prompts', 'prompts')

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
          .sort((a, b) => a.createdAt < b.createdAt)
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
            }) => {
              return (
                <Container key={_id} id={_id}>
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
                      <span>
                        <strong>Prompt:</strong> {prompt.option}
                      </span>
                    )}
                    <ButtonWrapper>
                      <SmallButton>
                        {isShowingDescription.hasOwnProperty(_id)
                          ? 'see less'
                          : 'see more'}
                      </SmallButton>
                      <SmallButton
                        onClick={() => toggleShowPrompts(_id)}
                        primary
                      >
                        add prompt
                      </SmallButton>
                      <SmallButton onClick={onMarkedRead}>
                        {isDone.hasOwnProperty(_id)
                          ? 'mark as to read'
                          : 'mark as done'}
                      </SmallButton>
                    </ButtonWrapper>
                    {isShowingPrompts.includes(_id) && (
                      <div id="choosePrompt">
                        {promptsData &&
                          promptsData.map((prompt, index) => (
                            <Entry
                              key={index}
                              onClick={() => chosenPrompt(prompt, _id)}
                              data-testid="historyEntry"
                            >
                              {prompt.option}
                            </Entry>
                          ))}
                      </div>
                    )}
                    {description ? (
                      <>
                        <div className="description">
                          {isShowingDescription.hasOwnProperty(_id) &&
                            description}
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

  function toggleShowPrompts(_id) {
    let newIsShowingPrompts
    if (isShowingPrompts.includes(_id)) {
      newIsShowingPrompts = isShowingPrompts.filter(bookId => bookId !== _id)
    } else {
      newIsShowingPrompts = [...isShowingPrompts, _id]
    }
    setIsShowingPrompts(newIsShowingPrompts)
  }

  function onMarkedRead(event) {
    event.target.parentNode.parentNode.parentNode.classList.toggle('read')
    // const newHistory = history
    // newHistory.splice(
    //   history.findIndex(entry => entry === `${chosenItems}`),
    //   1,
    //   `${chosenItems} ✔️`
    // )
    // setHistory(newHistory)
  }

  function chosenPrompt(prompt, _id) {
    const addedPrompt = { _id: prompt._id }
    savePromptToBook(_id, addedPrompt)
    toggleShowPrompts(_id)
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

  &.unread {
    background: linear-gradient(#fedbdb 0%, #db8c8c 100%);
  }

  &.read {
    // background: linear-gradient(#d2f9e8 0%, #83c1a6 100%);
    opacity: 0.5;
  }

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

  #choosePrompt {
    grid-column: 1 / 3;
    justify-self: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;

    & > * {
      margin-right: 5px;
      margin-bottom: 5px;
    }
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
