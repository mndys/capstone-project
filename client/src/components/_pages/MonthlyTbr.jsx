import axios from 'axios'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
import styled from 'styled-components/macro'
import Button from '../Style/Styled-Components/Button'

export default function MonthlyTbr({ history, setHistory }) {
  const [choosePrompt, setChoosePrompt] = useState(false)
  const [chosenItem, setChosenItem] = useState('')
  const [readStatus, setReadStatus] = useState('unread')

  const fetchRounds = async () => {
    const { data } = await axios.get('api/rounds')
    return data
  }

  const { status, data } = useQuery('yourCurrentTBR', fetchRounds, {
    refetchOnWindowFocus: false,
  })

  return (
    <PageWrapper>
      <h2>This Month's TBR</h2>
      {status === 'success' && (
        <Container key={data[2].book._id} className={readStatus}>
          <div
            className="x"
            onClick={() => {
              setReadStatus('unread')
            }}
          >
            ✖️
          </div>
          <div
            className="now"
            onClick={() => {
              setReadStatus('read')
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
            <img src={data[2].book.cover} alt="" />
            <h3>{data[2].book.title}</h3>
            {data[2].book.author && (
              <span>
                by <em>{data[2].book.author} </em>
                {data[2].book.publishedDate
                  ? `(${parseInt(data[2].book.publishedDate)})`
                  : ''}
              </span>
            )}
            {data[2].book.genre && (
              <span>
                <strong>Genre:</strong> {data[2].book.genre.join(', ')}
              </span>
            )}
            {data[2].book.pageCount && (
              <span>
                <strong>Page Count:</strong> {data[2].book.pageCount}
              </span>
            )}
            {data[2].book.rating && (
              <span>
                <strong>Rating:</strong> {data[2].book.rating} ⭐️
              </span>
            )}
            {data[2].book.isbn && (
              <span>
                <strong>ISBN:</strong> {data[2].book.isbn}
              </span>
            )}
            {chosenItem !== '' && (
              <span>
                <strong>Prompt:</strong> {chosenItem}
              </span>
            )}
            {data[2].book.description ? (
              <details>
                <summary>
                  <strong>Description:</strong>
                </summary>
                {data[2].book.description}
              </details>
            ) : (
              ''
            )}
            <Button onClick={addPrompt} primary disabled={chosenItem !== ''}>
              add prompt
            </Button>
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

  function addPrompt() {
    setChoosePrompt(true)
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
