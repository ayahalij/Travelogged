const request = require('supertest')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const app = require('../app')
const server = app.listen(8080, () => console.log('Testing on PORT 8080'))
const Author = require('../models/auth')
let mongoServer

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create()
  await mongoose.connect(mongoServer.getUri())
})

afterAll(async () => {
  await mongoose.connection.close()
  mongoServer.stop()
  server.close()
})

afterEach(async () => {
  await Author.deleteMany({})
})

describe('Author API Tests', () => {
  describe('POST /api/authors', () => {
    test('should create a new author successfully', async () => {
      const authorData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        bio: 'A passionate writer'
      }

      const response = await request(app)
        .post('/api/authors')
        .send(authorData)
        .expect(201)

      expect(response.body).toHaveProperty('author')
      expect(response.body).toHaveProperty('token')
      expect(response.body.author.name).toBe(authorData.name)
      expect(response.body.author.email).toBe(authorData.email)
      expect(response.body.author.password).toBeUndefined()
    })

    test('should return 400 for invalid author data', async () => {
      const invalidData = { name: 'John Doe' }

      const response = await request(app)
        .post('/api/authors')
        .send(invalidData)
        .expect(400)

      expect(response.body).toHaveProperty('message')
    })
  })

  describe('POST /api/authors/login', () => {
    beforeEach(async () => {
      const author = new Author({
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      })
      await author.save()
    })

    test('should login author with valid credentials', async () => {
      const loginData = {
        email: 'john@example.com',
        password: 'password123'
      }

      const response = await request(app)
        .post('/api/authors/login')
        .send(loginData)
        .expect(200)

      expect(response.body).toHaveProperty('author')
      expect(response.body).toHaveProperty('token')
    })
  })
})