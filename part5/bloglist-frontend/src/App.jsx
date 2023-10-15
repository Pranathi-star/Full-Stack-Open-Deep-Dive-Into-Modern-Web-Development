import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [blog, setBlog] = useState(null) 
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
}

const handleLogout = async (event) => {
    setUser(null)
    window.localStorage.removeItem(
        'loggedBlogappUser'
    ) 
}

const handleNewBlog = async (event) => {
    event.preventDefault()
    
    try {
      const newBlog = await blogService.create({
        title, author, url, user
      })
      setBlog(newBlog)
      setTitle('')
      setUrl('')
    } catch (exception) {
      setErrorMessage('Wrong input')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
}


if (user === null) {
return (
    <div>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
    <div>
        username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
        />
    </div>
    <div>
        password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
        />
    </div>
    <button type="submit">login</button>
    </form>
    </div>
)
}

return (
<div>
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
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
    {blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
    )}
    <button onClick={handleLogout}>logout</button>
</div>
)
}

export default App
