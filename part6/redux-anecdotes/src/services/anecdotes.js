import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const newAnecdote = {content: content, votes: 0}
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const updateVotes = async (updatedEntry, id) => {

  const response = await axios.put(baseUrl + `/${id}`, updatedEntry)
  return response.data
}

export default { getAll, createAnecdote, updateVotes }