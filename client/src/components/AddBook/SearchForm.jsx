import Input from '../Sitewide/Input'

export default function SearchForm({ handleSubmit }) {
  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <Input
        type="search"
        name="search"
        className="big-label"
        placeholder="type your search terms like Title, Author, or both"
        required
        autoFocus
      >
        Search Google Books:
      </Input>
    </form>
  )
}
