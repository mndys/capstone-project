import styled from 'styled-components/macro'

export default function History({ history, onClick }) {
  return (
    <Wrapper>
      <h2>Spin History</h2>
      <HistoryEntries data-testid="history">
        {history.map((previousPrompt, index) => (
          <Entry key={index} onClick={onClick} data-testid="historyEntry">
            {previousPrompt}
          </Entry>
        ))}
      </HistoryEntries>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 2em 1em;
`

const HistoryEntries = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const Entry = styled.div`
  padding: 5px 15px;
  border-radius: 5px;
  background: var(--color-platinum);
  :hover {
    cursor: pointer;
  }
`
