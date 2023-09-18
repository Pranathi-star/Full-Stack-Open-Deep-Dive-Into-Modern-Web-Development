const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

mongoose.set("bufferTimeoutMS", 30000)
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})
  

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000)

test('there are two blogs', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})
  
test('the first blog is about HTTP methods', async () => {
    const blogsAtEnd = await helper.blogsInDb()
    const title = blogsAtEnd.map(r => r.title)
    expect(title).toContain(
      'React patterns'
    )
})

test('a valid blog can be added', async () => {
    const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain("Canonical string reduction")
})

test('blog without title is not added', async () => {
    const newBlog = {
        _id: "5a422b891b54a676234d17fa",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

afterAll(async () => {
  await mongoose.connection.close()
})