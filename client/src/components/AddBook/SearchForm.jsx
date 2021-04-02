import Input from '../Sitewide/Input'

export default function SearchForm({ handleSubmit }) {
  return (
    <Input
      type="search"
      name="search"
      className="big-label"
      placeholder="type your search terms like Title, Author, or both"
      required
      autoFocus
      autoComplete="off"
    >
      Search Google Books:
    </Input>
  )
}
