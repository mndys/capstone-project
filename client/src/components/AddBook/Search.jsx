import Input from '../Sitewide/Input'

export default function Search({ handleChange, inputValue }) {
  return (
    <Input
      type="search"
      name="search"
      className="big-label"
      placeholder="adding title and author yields best results"
      value={inputValue}
      autoFocus
      handleChange={handleChange}
    >
      Search Google Books:
    </Input>
  )
}
