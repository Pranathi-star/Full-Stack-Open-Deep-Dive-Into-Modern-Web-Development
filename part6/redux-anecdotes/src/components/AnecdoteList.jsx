import { useSelector, useDispatch } from 'react-redux'
import { updateVotes } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const dispatch = useDispatch()

  const vote = (id, content, votes) => {
    dispatch(updateVotes(id, content, votes + 1))
    var message = `you voted "${content}"`
    dispatch(setNotification(message, 10))
  }

  const anecdotes = useSelector(state => {
    return state.filter == '' ? state.anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
  })

  return (
      <div>
          {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
            </div>
          </div>
        )}
      </div>
  )
}

export default AnecdoteList;