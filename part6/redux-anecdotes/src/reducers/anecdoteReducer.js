import { createSlice } from '@reduxjs/toolkit'

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
    createAnecdote(state, action) {
      var newAnecdotes = state.concat(asObject(action.payload.toString()))
      return sortAnecdotes(newAnecdotes)
    },
    addVote(state, action) {
      var anecdoteToChange = state.find(item => item.id == action.payload);
      var changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      var newAnecdotes = state.map(anecdote => anecdote.id != action.payload ? anecdote: changedAnecdote)
      return sortAnecdotes(newAnecdotes)
    },
    setAnecdotes(state, action) {
      return sortAnecdotes(action.payload)
    }
  }
})
export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions 
export default anecdoteSlice.reducer