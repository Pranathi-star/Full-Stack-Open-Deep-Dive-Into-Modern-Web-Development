import { useState, useEffect, useRef } from 'react'
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
  const [isGood, setIsGood] = useState(1)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
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
      <Togglable buttonLabel='new blog' ref = {blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Succesfully logged in!')
      setTimeout(() => { setMessage(null) }, 5000)
    } catch (exception) {
      setMessage('Wrong credentials')
      setIsGood(0)
      setTimeout(() => {
        setMessage(null)
        setIsGood(1)
      }, 5000)
      setUsername('')
      setPassword('')
    }
}

const handleLogout = () => {
  window.localStorage.removeItem('loggedUser')
  setUser(null)
  setMessage('Succesfully logged out!')
  setTimeout(() => { setMessage(null) }, 5000)
}

const addBlog = (blogObject) => {
  blogFormRef.current.toggleVisibility()
  console.log(blogObject)
  blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes))
      setMessage(`Succesfully Added "${blogObject.title}" by ${blogObject.author}!`)
      setTimeout(() => { setMessage(null) }, 5000)
    })
}

const handleLikes = async (blog) => {
  console.log(blog)
  const newBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
  setBlogs(blogs.map(b => b.id === blog.id ? { ...b, ...newBlog } : b).sort((a, b) => b.likes - a.likes))
}

const handleDelete = async (blog) => {
  if (window.confirm(`Really remove blog "${blog.title}" by ${blog.author}?`)) {
    await blogService.remove(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id).sort((a, b) => b.likes - a.likes))
  }
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
      <Blog key={blog.id} blog={blog} handleLikes={handleLikes} canDelete={true} handleDelete={handleDelete} />
    )}
</div>
)
}

export default App
