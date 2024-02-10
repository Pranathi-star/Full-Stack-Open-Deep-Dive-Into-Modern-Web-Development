import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
  }

  const addAnecdote = (event) => {
    event.preventDefault();
    var content = event.target.anecdote.value
    console.log(content)
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes = {anecdotes} vote={vote} />
      <AnecdoteForm addAnecdote = {addAnecdote} />
    </div>
  )
}

export default App