export default async function deleteBook(_id) {
  const res = await fetch(`/api/books/${_id}`, {
    method: 'Delete',
    headers: {
      'content-type': 'application/json',
    },
  })
  const data = await res.json()
  return data.error ? Promise.reject(data) : data
}
