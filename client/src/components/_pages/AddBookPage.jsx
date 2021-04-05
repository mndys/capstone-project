import axios from 'axios'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { ReactQueryDevtoolsPanel } from 'react-query/devtools'
import styled from 'styled-components/macro'
import toTitleCase from '../../lib/toTitleCase'
import saveBook from '../../services/saveBook'
import AddBookForm from '../AddBook/AddBookForm'
import GoogleSearchResults from '../AddBook/GoogleSearchResults'
import Search from '../AddBook/Search'

export default function AddBookPage() {
  const API_KEY = process.env.REACT_APP_API_KEY
  const [search, setSearch] = useState(null)
  const [inputValue, setInputValue] = useState(null)

  const fetchBooks = async search => {
    const { data } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search.queryKey}&maxResults=40&key=${API_KEY}`
    )
    return data
  }

  const { status, data } = useQuery(search, fetchBooks, {
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearch(inputValue)
    }, 1000)
    return () => clearTimeout(timeoutId)
  }, [inputValue])

  return (
    <PageWrapper>
      <h2>Add Book to TBR</h2>
      <Search handleChange={onLiveSearch} value={inputValue} />
      {status === 'success' && search !== '' ? (
        <GoogleSearchResults
          handleSaveBook={book => onSaveGoogleBook(book)}
          {...{ data }}
        />
      ) : (
        ''
      )}
      <h3>... or create your own:</h3>
      <AddBookForm handleSubmit={onSaveBook} />
      <ReactQueryDevtoolsPanel />
    </PageWrapper>
  )

  function onLiveSearch(event) {
    const inputValue = event.target.value
    setInputValue(inputValue)
  }

  function onSaveGoogleBook(book) {
    const {
      imageLinks,
      title,
      authors,
      categories,
      pageCount,
      averageRating,
      publishedDate,
      industryIdentifiers,
      description,
    } = book
    const bookData = {
      cover: imageLinks
        ? imageLinks.thumbnail
          ? imageLinks.thumbnail
          : imageLinks.smallThumbnail
        : 'https://source.unsplash.com/HH4WBGNyltc/100x130',
      title,
      author: authors.join(', '),
      genre: categories,
      pageCount: pageCount,
      rating: averageRating,
      publishedDate: publishedDate,
      isbn: industryIdentifiers[0].identifier,
      description: description,
    }
    console.log(bookData)
    saveBook(bookData)
    setSearch(null)
  }
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
  console.log(bookData)
  saveBook(bookData)
  form.reset()
  title.focus()
}

export const PageWrapper = styled.section`
  padding: clamp(30px, 10%, 100px) clamp(15px, 5%, 50px);

  h2 {
    padding-bottom: 1.5rem;
  }
`
