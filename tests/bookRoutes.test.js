const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Book = require('../models/Book');
const bookRoutes = require('../routes/bookRoutes');

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

// Connect to a test database
beforeAll(async () => {
  const url = `mongodb://127.0.0.1/bookstore_test`;
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Book API', () => {
  beforeEach(async () => {
    await Book.deleteMany({});
  });

  test('It should create a new book', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        description: 'A book for testing purposes',
        price: 10.99,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Book');
  });

  test('It should get all books', async () => {
    await Book.create({ title: 'Test Book', author: 'Test Author', price: 10.99 });

    const response = await request(app).get('/books');
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test('It should get a book by id', async () => {
    const book = await Book.create({ title: 'Test Book', author: 'Test Author', price: 10.99 });

    const response = await request(app).get(`/books/${book._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Test Book');
  });

  test('It should update a book', async () => {
    const book = await Book.create({ title: 'Test Book', author: 'Test Author', price: 10.99 });

    const response = await request(app)
      .put(`/books/${book._id}`)
      .send({ title: 'Updated Book', author: 'Updated Author', price: 15.99 });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Book');
  });

  test('It should delete a book', async () => {
    const book = await Book.create({ title: 'Test Book', author: 'Test Author', price: 10.99 });

    const response = await request(app).delete(`/books/${book._id}`);
    expect(response.statusCode).toBe(200);

    const books = await Book.find();
    expect(books.length).toBe(0);
  });
});
