import PropTypes from 'prop-types';

const AnecdoteList = ({ anecdotes, vote }) => {
    return (
        <div>
            {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

AnecdoteList.propTypes = {
    anecdotes: PropTypes.object,
    vote: PropTypes.func
}
export default AnecdoteList;