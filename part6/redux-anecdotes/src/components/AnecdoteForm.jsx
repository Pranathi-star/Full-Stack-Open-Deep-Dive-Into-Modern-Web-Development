import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault();
        var content = event.target.anecdote.value
        console.log(content)
        event.target.anecdote.value = ''
        const newNote = await anecdoteService.createAnecdote(content)
        dispatch(createAnecdote(newNote))
        var message = `anecdote "${content}" successfully added!`
        dispatch(createNotification(message))
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm;