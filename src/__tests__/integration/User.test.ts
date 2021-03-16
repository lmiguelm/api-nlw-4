import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

import request from 'supertest';
import { app } from '../../app';

import createConnection from '../../database/index';
createConnection();

describe("Users", () => {

  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'user@example.com',
        name: 'User Example'
      });

    expect(response.status).toBe(201);
  });

  it('Should not be able to create a user with exists email', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'user@example.com',
        name: 'User Example'
      });

    expect(response.status).toBe(400);
  });
});