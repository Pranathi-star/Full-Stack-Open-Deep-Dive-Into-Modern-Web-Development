import Togglable from './Togglable'
import { useState } from 'react'

const Blog = ({ blog }) => {
  const [closed, setClosed] = useState(true)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }  
  return (
    <div style={{"display": "flex"}}>
      {closed && 
          <div style={blogStyle}>
            <p>{blog.title} {blog.author}</p>
          </div>
      }
      <Togglable buttonLabel={"view"} setClosed={setClosed}>
        <div style={blogStyle}>
          <p>{blog.title} {blog.author}</p>
          <p>{blog.url}</p>
          <div style={{"display": "flex"}}>
            <p>{blog.likes}</p><button>like</button>
          </div>
          <p>{blog.user}</p>
        </div>
      </Togglable>
    </div>
  )  

}

export default Blog