import styled from 'styled-components/macro'

export default function History({ history }) {
  return (
    <Entries>
      <h2>Spin History</h2>
      {history.join(', ')}
    </Entries>
  )
}

const Entries = styled.div`
  padding: 2em 1em;
`
