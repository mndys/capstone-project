import toggleStates from '../../lib/toggleStates'
import SmallButton from '../Style/Styled-Components/SmallButton'
import del from '../../images/delete.svg'
import styled from 'styled-components/macro'
import toMonthly from '../../images/toMonthly.svg'

export default function BookCard({
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
  onMarkedRead,
  onDeleteBook,
  onBookToTBR,
}) {
  return (
    <Container id={_id} className={read && 'read'}>
      <img
        src={del}
        alt="delete"
        className="icons delete"
        onClick={() => onDeleteBook(_id)}
      />
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
            {...(!read ? { onClick: () => onPromptClick(prompt, _id) } : '')}
          >
            <strong>Prompt:</strong>
            <img id="del" src={del} alt="delete" /> {prompt.option}
          </span>
        )}
        <ButtonWrapper>
          <SmallButton
            onClick={() =>
              toggleStates(_id, isShowingDescription, setIsShowingDescription)
            }
          >
            {isShowingDescription.hasOwnProperty(_id) ? 'less' : 'more'}
          </SmallButton>
          <SmallButton
            onClick={() =>
              toggleStates(_id, isShowingPrompts, setIsShowingPrompts)
            }
            primary
            disabled={read || prompt}
          >
            prompt
          </SmallButton>
          <SmallButton onClick={() => onMarkedRead(_id, read, prompt)}>
            {read ? 'to read' : 'done'}
          </SmallButton>
        </ButtonWrapper>
        {promptsData &&
        isShowingPrompts.includes(_id) &&
        promptsData.filter(prompt => !prompt.book).length === 0 ? (
          <p>
            Oh no! There are no prompts left.{' '}
            <a href="/">Spin&nbsp;the&nbsp;wheel</a> to receive more prompts or
            remove a prompt from another book to assign it here.
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
      {onBookToTBR && (
        <img
          src={toMonthly}
          alt="Add to monthly TBR"
          className="icons to-monthly"
          onClick={() => onBookToTBR(_id)}
        />
      )}
    </Container>
  )
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  grid-column: 1 / 3;
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

  .icons {
    position: absolute;
    top: 15px;
    width: 1.5rem;
    cursor: pointer;
  }

  .delete {
    right: 15px;
  }

  .to-monthly {
    left: 15px;
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

  p {
    grid-column: 1 / 3;
  }

  .choosePrompt {
    grid-column: 1 / 3;
    justify-self: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    margin-top: 0.3rem;
  }

  .prompt {
    display: flex;
    align-items: center;
    cursor: pointer;

    & > * {
      margin-right: 0.3em;
    }
  }

  #del {
    width: 1rem;
  }
`

const Entry = styled.div`
  padding: 5px 15px;
  margin-right: 5px;
  margin-bottom: 5px;
  border-radius: 5px;
  background: #0001;
  cursor: pointer;
`
