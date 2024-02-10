import PropTypes from 'prop-types';

const AnecdoteForm = ({ addAnecdote }) => {
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

AnecdoteForm.propTypes = {
    addAnecdote: PropTypes.func
}
export default AnecdoteForm;