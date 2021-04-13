import { useState } from 'react'
import styled from 'styled-components/macro'
import createRound from '../../services/createRound'
import { GridWrapper } from '../AddBook/AddBookForm'
import Button from '../Style/Styled-Components/Button'

export default function History({
  history,
  onToggleShowPromptInfo,
  resetHistory,
}) {
  const [buttonActive, setButtonActive] = useState(true)

  return (
    <Wrapper>
      <h2>Spin History</h2>
      <HistoryEntries data-testid="history">
        {history.map((previousPrompt, index) => (
          <Entry
            key={index}
            onClick={onToggleShowPromptInfo}
            data-testid="historyEntry"
          >
            {previousPrompt}
          </Entry>
        ))}
      </HistoryEntries>
      {history.length ? (
        <GridWrapper>
          <Button disabled={!buttonActive} onClick={createMonthlyTBR}>
            Create {<br />} monthly TBR
          </Button>
        </GridWrapper>
      ) : (
        ''
      )}
    </Wrapper>
  )

  function createMonthlyTBR() {
    setButtonActive(!buttonActive)
    resetHistory()
    createRound(history)
  }
}

const Wrapper = styled.div`
  padding: 2em 1em;
`

const HistoryEntries = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  & > * {
    margin-right: 5px;
    margin-bottom: 5px;
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
