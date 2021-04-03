import { useState } from 'react'
import styled from 'styled-components/macro'
import toTitleCase from '../../lib/toTitleCase'
import saveBook from '../../services/saveBook'
import searchGoogleBooks from '../../services/searchGoogleBooks'
import AddBookForm from '../AddBook/AddBookForm'
import GoogleSearchResults from '../AddBook/GoogleSearchResults'
import SearchForm from '../AddBook/SearchForm'

export default function AddBookPage() {
  const [searchResult, setSearchResult] = useState([])

  return (
    <PageWrapper>
      <h2>Add Book to TBR</h2>
      <SearchForm handleSubmit={onSearch} />
      <GoogleSearchResults searchResult={searchResult} />
      <h3>... or create your own:</h3>
      <AddBookForm handleSubmit={onSaveBook} />
    </PageWrapper>
  )

  function onSearch(event) {
    event.preventDefault()
    const form = event.target
    const search = form.elements.search.value
    searchGoogleBooks(search, setSearchResult)
    form.reset()
    form.elements.search.focus()
  }
  function onSaveBook(event) {
    event.preventDefault()
    const form = event.target
    const {
      title,
      author,
      genre,
      pageCount,
      rating,
      publishedDate,
      isbn,
      description,
    } = form.elements
    const bookData = {
      title: title.value,
      author: author.value,
      genre: toTitleCase(genre.value)
        .split(',')
        .map(genre => genre.trim())
        .filter(genre => genre !== ''),
      pageCount: pageCount.value,
      rating: rating.value,
      publishedDate: publishedDate.value,
      isbn: isbn.value,
      description: description.value,
    }
    saveBook(bookData)
    form.reset()
    title.focus()
  }
}

export const PageWrapper = styled.section`
  padding: clamp(30px, 10%, 100px) clamp(15px, 5%, 50px);

  h2 {
    padding-bottom: 1.5rem;
  }
`
