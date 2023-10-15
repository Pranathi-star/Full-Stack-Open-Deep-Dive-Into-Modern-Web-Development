import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [isGood, setIsGood] = useState(null)
  const [message, setMessage] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  
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

  const blogForm = () => {
    return (
      <Togglable buttonLabel='new note'>
        <BlogForm
          setIsGood = {setIsGood} setMessage = {setMessage} user = {user} setErrorMessage = {setErrorMessage}
        />
      </Togglable>
    )
  }

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

const negativeNotification = () => {
  setIsGood(false)
  setMessage(`wrong username or password`)
  setTimeout(() => {setMessage(null); setIsGood(null)}, 5000)
}


if (user === null) {
  return (
      <div>
        <h2>Blogs</h2>
        <Notification message={message} isGood={isGood} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
  )
}

return (
<div>
    <h2>blogs</h2>
    <Notification message={message} isGood={isGood}/>
    <div style={{"display": "flex"}}>
      <p>{user.name} logged in</p> 
      <button onClick={handleLogout}>logout</button>
    </div>
    {blogForm()}
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
</div>
)
}

export default App
