import { useState } from 'react'

const Blog = ({ blog, handleLikes, canDelete, handleDelete }) => {
  const [info, setInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }  

  if (info === false) {
    return (
      <div style={blogStyle}>
        <div className='blog'>
          {blog.title} {blog.author}
          <button
            type="submit"
            onClick={() => setInfo(true)}
            id = {'viewButton'}>
            view
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blog.title}
        <button
          type="submit"
          onClick={() => setInfo(false)}>
          hide
        </button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button
          type="submit"
          onClick={() => handleLikes({ ...blog, user: blog.user.id })}
          id = {'likeButton'} >
          like
        </button>
        <br />
        {blog.author}
        <br />
        {canDelete &&
          <button
            type="submit"
            onClick={() => handleDelete(blog)}>
            remove
          </button>
        }
      </div>
    </div>
  )
}

export default Blog