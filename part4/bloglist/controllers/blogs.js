const blogsRouter = require("express").Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.post('/', async (request, response) => {
  
  const user = request.user

  const blog = new Blog({
    title: request.body.title,
    author:request.body.author,
    url:request.body.url,
    likes: request.body.likes,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.notes = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', {'username': 1, 'name': 1})
  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const userid = request.user.id
  if ( blog.user.toString() === userid.toString() ){
    const result = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json(result)
  }
  else {
    response.status(401).json({"error": "Unauthorized"})
  }
})

blogsRouter.put("/:id", async (request, response) => {
  const result = await Blog.findByIdAndUpdate(request.params.id, {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }, { new: true, runValidators: true, context: 'query' })
  response.status(200).json(result)
})


module.exports = blogsRouter