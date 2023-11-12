const blogsRouter = require("express").Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.post('/', async (request, response) => {
  
  const blog = new Blog({
    title: request.body.title,
    author:request.body.author,
    url:request.body.url,
    likes: request.body.likes,
    user: request.user.id
  })

  console.log("ffff"+JSON.stringify(request.user))

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', {'username': 1, 'name': 1})
  response.status(200).json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
  console.log("hhh" + request.params)
  const blog = await Blog.findById(request.params.id)
    const result = await Blog.findByIdAndDelete(request.params.id)
    response.status(204).json(result)
})

blogsRouter.put("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  console.log("gggg"+ request.user)
    const result = await Blog.findByIdAndUpdate(request.params.id, {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes
    }, { new: true, runValidators: true, context: 'query' })
    response.status(200).json(result)
})


module.exports = blogsRouter