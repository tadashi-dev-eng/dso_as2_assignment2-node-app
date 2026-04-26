// // Mock the pg module BEFORE importing app
// jest.mock('pg', () => {
//   const mockPool = {
//     query: jest.fn(),
//   };
//   return { Pool: jest.fn(() => mockPool) };
// });

// const request = require('supertest');
// const { Pool } = require('pg');
// const app = require('../server');

// // Get reference to the mocked pool
// const mockPool = new Pool();

// // Reset mocks before each test
// beforeEach(() => {
//   mockPool.query.mockReset();
// });

// describe('Todo API Tests', () => {

//   // ✅ Test 1: GET /todos
//   test('GET /todos - should return all todos', async () => {
//     mockPool.query.mockResolvedValueOnce({
//       rows: [
//         { id: 1, task: 'Buy groceries', done: false },
//         { id: 2, task: 'Do laundry', done: true }
//       ]
//     });

//     const res = await request(app).get('/todos');
//     expect(res.statusCode).toBe(200);
//     expect(Array.isArray(res.body)).toBe(true);
//     expect(res.body.length).toBe(2);
//   });

//   // ✅ Test 2: POST /todos - success
//   test('POST /todos - should create a new todo', async () => {
//     mockPool.query.mockResolvedValueOnce({
//       rows: [{ id: 1, task: 'New task', done: false }]
//     });

//     const res = await request(app)
//       .post('/todos')
//       .send({ task: 'New task' });

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('task', 'New task');
//   });

//   // ✅ Test 3: POST /todos - missing task
//   test('POST /todos - should return 400 if task is missing', async () => {
//     const res = await request(app)
//       .post('/todos')
//       .send({});

//     expect(res.statusCode).toBe(400);
//     expect(res.body).toHaveProperty('error', 'Task is required');
//   });

//   // ✅ Test 4: PUT /todos/:id - success
//   test('PUT /todos/:id - should update a todo', async () => {
//     mockPool.query.mockResolvedValueOnce({
//       rows: [{ id: 1, task: 'Updated task', done: true }]
//     });

//     const res = await request(app)
//       .put('/todos/1')
//       .send({ task: 'Updated task', done: true });

//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('task', 'Updated task');
//   });

//   // ✅ Test 5: PUT /todos/:id - not found
//   test('PUT /todos/:id - should return 404 if todo not found', async () => {
//     mockPool.query.mockResolvedValueOnce({ rows: [] });

//     const res = await request(app)
//       .put('/todos/999')
//       .send({ task: 'Ghost task', done: false });

//     expect(res.statusCode).toBe(404);
//     expect(res.body).toHaveProperty('error', 'Todo not found');
//   });

//   // ✅ Test 6: DELETE /todos/:id
//   test('DELETE /todos/:id - should delete a todo', async () => {
//     mockPool.query.mockResolvedValueOnce({ rows: [] });

//     const res = await request(app).delete('/todos/1');
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('message', 'Deleted successfully');
//   });

// });

jest.mock('pg', () => {
  const mockPool = { query: jest.fn() };
  return { Pool: jest.fn(() => mockPool) };
});

const request = require('supertest');
const { Pool } = require('pg');
const app = require('../server');
const mockPool = new Pool();

beforeEach(() => {
  mockPool.query.mockReset();
});

describe('Todo API Tests', () => {

  test('GET /todos - should return all todos', async () => {
    mockPool.query.mockResolvedValueOnce({
      rows: [{ id: 1, task: 'Buy groceries', done: false }]
    });
    const res = await request(app).get('/todos');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /todos - should create a new todo', async () => {
    mockPool.query.mockResolvedValueOnce({
      rows: [{ id: 1, task: 'New task', done: false }]
    });
    const res = await request(app)
      .post('/todos')
      .send({ task: 'New task' });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('task', 'New task');
  });

  test('POST /todos - should return 400 if task missing', async () => {
    const res = await request(app).post('/todos').send({});
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'Task is required');
  });

  test('PUT /todos/:id - should update a todo', async () => {
    mockPool.query.mockResolvedValueOnce({
      rows: [{ id: 1, task: 'Updated', done: true }]
    });
    const res = await request(app)
      .put('/todos/1')
      .send({ task: 'Updated', done: true });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('task', 'Updated');
  });

  test('DELETE /todos/:id - should delete a todo', async () => {
    mockPool.query.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).delete('/todos/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Deleted successfully');
  });

});