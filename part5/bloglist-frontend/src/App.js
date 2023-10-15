import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const goodNotificationStyle = {
  color: 'green',
  background: 'lightgrey',
  fontSize: `20`,
  borderStyle: 'solid',
  borderRadius: `5`,
  padding: `10`,
  marginBottom: `10`
}

const badNotificationStyle = {
  color: 'red',
  background: 'lightgrey',
  fontSize: `20`,
  borderStyle: 'solid',
  borderRadius: `5`,
  padding: `10`,
  marginBottom: `10`
}

const Notification = ({ message, isGood }) => {
  if (message === null) {
    return null
  }

  const notificationStyle = isGood?
    goodNotificationStyle : badNotificationStyle

  console.log(notificationStyle)
  return (
    <div style={notificationStyle}>
      <p>{message}</p>
    </div>
  )
}

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
  const [isGood, setIsGood] = useState(null)
  const [message, setMessage] = useState(null)
  
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
      negativeNotification()
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

const positiveNotification = (title, author) => {
  setIsGood(true)
  setMessage(`a new blog ${title} by ${author} added`)
  setTimeout(() => {setMessage(null); setIsGood(null)}, 5000)
}

const negativeNotification = () => {
  setIsGood(false)
  setMessage(`wrong username or password`)
  setTimeout(() => {setMessage(null); setIsGood(null)}, 5000)
}


if (user === null) {
return (
    <div>
      <Notification message={message} isGood={isGood} />
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
    <Notification message={message} isGood={isGood}/>
    <span style={{"display": "inline"}}>
      <p>{user.name} logged in</p> <button onClick={handleLogout}>logout</button>
    </span>
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
</div>
)
}

export default App
