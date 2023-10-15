import blogService from '../services/blogs'
import { useState } from 'react'

const BlogForm = ({ setIsGood, setMessage, user, setErrorMessage }) => {

    const [title, setTitle] = useState('') 
    const [author, setAuthor] = useState('') 
    const [url, setUrl] = useState('') 
    const [blog, setBlog] = useState(null) 

    const positiveNotification = (title, author) => {
        setIsGood(true)
        setMessage(`a new blog ${title} by ${author} added`)
        setTimeout(() => {setMessage(null); setIsGood(null)}, 5000)
    }
  
    const handleNewBlog = async (event) => {
        event.preventDefault()
        
        try {
          const newBlog = await blogService.create({
            title, author, url, user
          })
          setBlog(newBlog)
          positiveNotification(title, author)
          setTitle('')
          setUrl('')
        } catch (exception) {
          setErrorMessage('Wrong input')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
    }
    

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleNewBlog}>
            <div>
                title
                <input
                type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                type="text"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                type="text"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
            </form>
        </div>      
    )
}

export default BlogForm