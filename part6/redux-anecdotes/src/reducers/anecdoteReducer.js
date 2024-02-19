import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

const anecdotesAtStart = []
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortAnecdotes = (anecdotes) => {
  anecdotes.sort((a, b) => b.votes - a.votes)
  return anecdotes
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: 
  {
    addVote(state, action) {
      var anecdoteToChange = state.find(item => item.id == action.payload);
      var changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      var newAnecdotes = state.map(anecdote => anecdote.id != action.payload ? anecdote: changedAnecdote)
      return sortAnecdotes(newAnecdotes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
      return sortAnecdotes(state)
    },
    setAnecdotes(state, action) {
      return sortAnecdotes(action.payload)
    }
  }
})

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions 

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  } 
}

export const updateVotes = (id, content, updatedVotes) => {
  return async dispatch => {
    const updatedAnecdote = {id: id, content: content, votes: updatedVotes}
    const response = await anecdoteService.updateVotes(updatedAnecdote, id)
    dispatch(addVote(response.id))
  }
}

export default anecdoteSlice.reducer