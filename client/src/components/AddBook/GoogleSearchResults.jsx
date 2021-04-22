import styled from 'styled-components/macro'

export default function GoogleSearchResults({ data, handleSaveBook }) {
  const filteredSearch = data.items
    .filter(book => {
      if (book.volumeInfo.publisher === undefined) {
        return false
      }
      if (book.volumeInfo.publisher.match(/grin/i)) {
        return false
      }
      return true
    })
    .slice(0, 10)

  return (
    <Container>
      {filteredSearch.map(book => (
        <Card key={book.id} onClick={() => handleSaveBook(book.volumeInfo)}>
          {book.volumeInfo.imageLinks ? (
            <img
              src={
                book.volumeInfo.imageLinks.thumbnail
                  ? book.volumeInfo.imageLinks.thumbnail
                  : book.volumeInfo.imageLinks.smallThumbnail
              }
              alt=""
            />
          ) : (
            <img src="https://source.unsplash.com/HH4WBGNyltc/100x130" alt="" />
          )}
          {book.volumeInfo.title ? <h3>{book.volumeInfo.title}</h3> : ''}
          {book.volumeInfo.authors ? (
            <span>
              by{' '}
              {book.volumeInfo.authors.map((author, index) => {
                while (index < book.volumeInfo.authors.length - 1) {
                  return <em>{author}, </em>
                }
                return <em>{author}</em>
              })}
            </span>
          ) : (
            ''
          )}
          {book.volumeInfo.publishedDate
            ? `(${parseInt(book.volumeInfo.publishedDate)})`
            : ''}
        </Card>
      ))}
    </Container>
  )
}

const Container = styled.section`
  display: grid;
  row-gap: 15px;
  background: linear-gradient(#fff 0%, var(--color-platinum) 100%);
  width: clamp(200px, 80vw, 730px);
  padding: 20px;
  border-radius: 5px;
  box-shadow: 1px 2px 6px 0px var(--color-shadow);
  font-size: 14px;

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
  column-gap: 5px;
  justify-content: center;
  cursor: pointer;

  img {
    grid-row: 1 / 4;
    align-self: center;
    width: 50px;
  }
`
