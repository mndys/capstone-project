import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
import styled from 'styled-components/macro'
import useQueryGet from '../../lib/hooks/useQueryGet'
import Button from '../Style/Styled-Components/Button'
import SmallButton from '../Style/Styled-Components/SmallButton'

export default function MonthlyTbr({ history, setHistory }) {
  const [choosePrompt, setChoosePrompt] = useState(false)
  const [chosenItem, setChosenItem] = useState('')
  const [readStatus, setReadStatus] = useState('unread')

  const { isLoading, isError, isSuccess, data } = useQueryGet('api/rounds')

  return (
    <PageWrapper>
      <h2>This Month's TBR</h2>
      {(isError || !data) && (
        <p>
          Oh no! There was an error loading your data. <br />
          Please make sure you have chosen books for this month from your{' '}
          <a href="/tbr">main TBR</a>.
        </p>
      )}
      {isLoading && 'Your monthly TBR is being prepared...'}
      {isSuccess &&
        data &&
        data.books
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
            }) => {
              return (
                <Container key={_id}>
                  <div
                    className="now"
                    onClick={event => {
                      event.currentTarget.parentNode.classList.toggle('read')
                      const newHistory = history
                      newHistory.splice(
                        history.findIndex(entry => entry === `${chosenItem}`),
                        1,
                        `${chosenItem} ✔️`
                      )
                      setHistory(newHistory)
                    }}
                  >
                     ✓
                  </div>
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
                    {chosenItem !== '' && (
                      <span>
                        <strong>Prompt:</strong> {chosenItem}
                      </span>
                    )}
                    {description ? (
                      <details>
                        <summary>
                          <strong>Description:</strong>
                        </summary>
                        {description}
                      </details>
                    ) : (
                      ''
                    )}
                    <SmallButton
                      onClick={toggleChoosePrompt}
                      primary
                      disabled={chosenItem !== ''}
                    >
                      add prompt
                    </SmallButton>
                    {choosePrompt && (
                      <div id="choosePrompt">
                        {history.map((item, index) => (
                          <Entry
                            key={index}
                            onClick={() => chosenPrompt(item)}
                            data-testid="historyEntry"
                          >
                            {item}
                          </Entry>
                        ))}
                        {console.log(history)}
                      </div>
                    )}
                  </Card>
                </Container>
              )
            }
          )}
      <ReactQueryDevtoolsPanel />
    </PageWrapper>
  )

  function chosenPrompt(item) {
    setChosenItem(item)
    toggleChoosePrompt()
  }

  function toggleChoosePrompt() {
    setChoosePrompt(!choosePrompt)
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
    background: linear-gradient(#d2f9e8 0%, #83c1a6 100%);
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
  details {
    padding-top: 1em;
    grid-column: 1 / 3;
  }

  button {
    grid-column: 1 / 3;
    justify-self: center;
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

const Entry = styled.div`
  padding: 5px 15px;
  border-radius: 5px;
  background: var(--color-platinum);
  :hover {
    cursor: pointer;
  }
`
